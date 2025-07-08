import * as grpc from '@grpc/grpc-js';
import prisma from '../prisma-client.js';
import { SortOrder, Video } from '../types.js';
import dotenv from 'dotenv';
import { videosProto } from './proto-loader.js';

dotenv.config();

interface ListVideosRequest {
  sort_by: string;
}

interface CreateVideoRequest {
  title: string;
  tags: string[];
}

/**
 * Implements the ListVideos RPC method.
 */
async function listVideos(
  call: grpc.ServerWritableStream<ListVideosRequest, Video>
): Promise<void> {
  try {
    const { sort_by } = call.request;
    
    // Query videos from the database
    const videos = await prisma.video.findMany({
      orderBy: {
        created_at: sort_by === SortOrder.OLDEST ? 'asc' : 'desc',
      },
    });

    // Stream each video back to the client
    for (const video of videos) {
      call.write({
        id: video.id,
        title: video.title,
        thumbnail_url: video.thumbnail_url,
        created_at: video.created_at.toISOString(),
        duration: video.duration,
        views: video.views,
        tags: video.tags,
      });
    }

    call.end();
  } catch (error) {
    console.error('Error in listVideos:', error);
    call.destroy(new Error('Internal server error'));
  }
}

/**
 * Implements the CreateVideo RPC method.
 */
async function createVideo(
  call: grpc.ServerUnaryCall<CreateVideoRequest, Video>,
  callback: grpc.sendUnaryData<Video>
): Promise<void> {
  try {
    const { title, tags } = call.request;
    
    // Generate a thumbnail URL (in a real app, this would be an upload)
    const thumbnailUrl = `https://picsum.photos/seed/video${Date.now()}/300/200`;

    const newVideo = await prisma.video.create({
      data: {
        title,
        tags,
        thumbnail_url: thumbnailUrl,
        duration: Math.floor(Math.random() * 600) + 60, // Random duration between 1-10 minutes
      },
    });

    callback(null, {
      id: newVideo.id,
      title: newVideo.title,
      thumbnail_url: newVideo.thumbnail_url,
      created_at: newVideo.created_at.toISOString(),
      duration: newVideo.duration,
      views: newVideo.views,
      tags: newVideo.tags,
    });
  } catch (error) {
    console.error('Error in createVideo:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    } as any);
  }
}

/**
 * Start the gRPC server
 */
export function startGrpcServer() {
  const server = new grpc.Server();
  
  server.addService(videosProto.VideoService.service, {
    listVideos,
    createVideo,
  });
  
  const isLocal = process.env.IS_LOCAL === 'true';
  const port = process.env.GRPC_PORT || '50051';
  const host = process.env.GRPC_SERVER_HOST || '0.0.0.0';
  
  server.bindAsync(
    `${host}:${port}`,
    isLocal
      ? grpc.ServerCredentials.createInsecure()
      // For prod needs to be configured
      : grpc.ServerCredentials.createSsl(null, [], false),
    (err, port) => {
      if (err) {
        console.error('Failed to bind gRPC server:', err);
        return;
      }
      
      console.log(`gRPC server is running on ${host}:${port}`);
    }
  );
  
  return server;
}
