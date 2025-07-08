/**
 * Video utility functions for formatting video data
 */

import { Video } from '@/lib/slice/videos-api.slice';

/**
 * Format date to a readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Sort videos by date
 */
export function sortVideos(videos: Video[], sortBy: 'newest' | 'oldest' = 'newest'): Video[] {
  const sorted = [...videos].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      default:
        return 0;
    }
  });

  return sorted;
}
