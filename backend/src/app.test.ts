import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import supertest from 'supertest';
import { FastifyInstance } from 'fastify';
import {
  mockVideoCreate,
  mockVideoCreateResponse,
  mockVideoResponse,
} from './__tests__/fixtures.js';
import { createApp } from './app.js';

vi.mock('./grpc/client.js', () => ({
  createVideo: vi.fn(),
  listVideos: vi.fn(),
}));

import { createVideo, listVideos } from './grpc/client.js';

describe('API Routes', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = createApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /videos', () => {
    beforeEach(() => {
      vi.mocked(createVideo).mockClear();
    });

    it('should create a video and return a 201 status on success', async () => {
      vi.mocked(createVideo).mockResolvedValue(mockVideoCreateResponse);

      const response = await supertest(app.server)
        .post('/videos')
        .send(mockVideoCreate);

      expect(createVideo).toHaveBeenCalledWith(
        mockVideoCreate.title,
        mockVideoCreate.tags
      );
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        video: mockVideoCreateResponse,
        message: 'Video created successfully',
      });
    });
  });

  describe('GET /videos', () => {
    beforeEach(() => {
      vi.mocked(listVideos).mockClear();
    });

    it('should return a list of videos successfully', async () => {
      const videos = [mockVideoResponse];
      vi.mocked(listVideos).mockResolvedValue(videos);

      const response = await supertest(app.server).get('/videos');

      expect(response.status).toBe(200);
      expect(listVideos).toHaveBeenCalledWith('newest');
      expect(response.body).toEqual({
        videos,
        total: videos.length,
      });
    });
  });
});
