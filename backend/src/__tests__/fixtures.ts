/**
 * Test fixtures for use in tests
 */
import { Video } from '../types.js';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Test Video 1',
    thumbnail_url: 'https://example.com/thumb1.jpg',
    created_at: '2023-01-01T00:00:00.000Z',
    duration: 120,
    views: 0,
    tags: ['test', 'video']
  },
  {
    id: '2',
    title: 'Test Video 2',
    thumbnail_url: 'https://example.com/thumb2.jpg',
    created_at: '2023-01-02T00:00:00.000Z',
    duration: 180,
    views: 5,
    tags: ['test', 'demo']
  }
];

export const mockVideoResponse: Video = {
  id: '1',
  title: 'Test Video 1',
  thumbnail_url: 'https://example.com/thumb1.jpg',
  created_at: '2023-01-01T00:00:00.000Z',
  duration: 120,
  views: 0,
  tags: ['test', 'video']
};

export const mockVideoCreate = {
  title: 'New Test Video',
  tags: ['new', 'test']
};

export const mockVideoCreateResponse: Video = {
  id: '3',
  title: 'New Test Video',
  thumbnail_url: 'https://example.com/thumb3.jpg',
  created_at: '2023-01-03T00:00:00.000Z',
  duration: 240,
  views: 0,
  tags: ['new', 'test']
};
