import * as grpc from '@grpc/grpc-js';
import { Video, SortOrder } from '../types.js';
import dotenv from 'dotenv';
import { videosProto } from './proto-loader.js';

dotenv.config();

const isLocal = process.env.IS_LOCAL === 'true';
const port = process.env.GRPC_PORT || '50051';
// For local or same server/container/pod
const host = process.env.GRPC_CLIENT_HOST || 'localhost';

const client = new videosProto.VideoService(
  `${host}:${port}`,
  isLocal
    ? grpc.credentials.createInsecure()
    : grpc.credentials.createSsl() // For prod needs to be configured
);

/**
 * List videos from the gRPC service
 */
export function listVideos(sortBy: string = SortOrder.NEWEST): Promise<Video[]> {
  return new Promise<Video[]>((resolve, reject) => {
    const videos: Video[] = [];
    const call = client.listVideos({
      sort_by: sortBy,
    });
    
    call.on('data', (video: Video) => {
      videos.push(video);
    });
    
    call.on('end', () => {
      resolve(videos);
    });
    
    call.on('error', (error: Error) => {
      reject(error);
    });
  });
}

/**
 * Create a video using the gRPC service
 */
export function createVideo(title: string, tags: string[]): Promise<Video> {
  return new Promise<Video>((resolve, reject) => {
    client.createVideo({ title, tags }, (error: Error | null, video: Video) => {
      if (error) {
        reject(error);
      } else {
        resolve(video);
      }
    });
  });
}
