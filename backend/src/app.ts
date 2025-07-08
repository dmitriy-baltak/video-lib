import Fastify from 'fastify';
import cors from '@fastify/cors';
import { ZodError } from 'zod';
import { listVideos, createVideo } from './grpc/client.js';
import { SortOrder } from './types.js';
import { createVideoSchema } from './schemas.js';

interface QueryString {
  sortBy?: string;
}

export async function getVideosHandler(request: any, reply: any) {
  try {
    const { query } = request;
    const sortBy = query.sortBy === SortOrder.OLDEST ? SortOrder.OLDEST : SortOrder.NEWEST;

    const videos = await listVideos(sortBy);

    return {
      videos,
      total: videos.length,
    };
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal server error',
    });
  }
}

export async function createVideoHandler(request: any, reply: any) {
  try {
    const body = request.body;
    const validatedData = createVideoSchema.parse(body);
    const newVideo = await createVideo(validatedData.title, validatedData.tags);

    return reply.status(201).send({
      video: newVideo,
      message: 'Video created successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        error: 'Validation failed',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal server error',
    });
  }
}

export function createApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin: true, // For prod needs to be configured
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  });

  // Use the exported handlers
  app.get<{Querystring: QueryString}>('/videos', getVideosHandler);
  app.post<{Body: {title: string, tags: string[]}}>('/videos', createVideoHandler);

  return app;
}
