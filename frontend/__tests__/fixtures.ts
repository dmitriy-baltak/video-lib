import type { Video } from '@/lib/slice/videos-api.slice';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Video 1',
    thumbnail_url: 'https://example.com/thumb1.jpg',
    created_at: '2023-01-01T00:00:00.000Z',
    duration: 120,
    views: 100,
    tags: ['test']
  },
  {
    id: '2',
    title: 'Video 2',
    thumbnail_url: 'https://example.com/thumb2.jpg',
    created_at: '2023-01-03T00:00:00.000Z',
    duration: 180,
    views: 200,
    tags: ['test']
  },
  {
    id: '3',
    title: 'Video 3',
    thumbnail_url: 'https://example.com/thumb3.jpg',
    created_at: '2023-01-02T00:00:00.000Z',
    duration: 240,
    views: 150,
    tags: ['test']
  }
];

export const mockTestVideo: Video = {
  id: 'test-video',
  title: 'Test Video',
  thumbnail_url: 'https://example.com/thumb.jpg',
  created_at: '2023-01-15T14:23:11Z',
  duration: 120,
  views: 1500,
  tags: ['tutorial', 'test']
};
