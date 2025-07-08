import { describe, it, expect } from 'vitest';
import { formatDate, sortVideos } from './video.utils';
import { mockVideos } from '../../__tests__/fixtures';

describe('Video Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const dateString = '2023-01-15T14:23:11Z';
      const result = formatDate(dateString);
      expect(result).toBe('Jan 15, 2023');
    });

    it('should handle different date formats', () => {
      const dateString = '2024-12-25T00:00:00.000Z';
      const result = formatDate(dateString);
      expect(result).toBe('Dec 25, 2024');
    });
  });

  describe('sortVideos', () => {

    it('should sort videos by newest first by default', () => {
      const sorted = sortVideos(mockVideos);
      expect(sorted[0].id).toBe('2'); // 2023-01-03
      expect(sorted[1].id).toBe('3'); // 2023-01-02
      expect(sorted[2].id).toBe('1'); // 2023-01-01
    });

    it('should sort videos by oldest when specified', () => {
      const sorted = sortVideos(mockVideos, 'oldest');
      expect(sorted[0].id).toBe('1'); // 2023-01-01
      expect(sorted[1].id).toBe('3'); // 2023-01-02
      expect(sorted[2].id).toBe('2'); // 2023-01-03
    });

    it('should not mutate original array', () => {
      const original = [...mockVideos];
      sortVideos(mockVideos);
      expect(mockVideos).toEqual(original);
    });
  });
});
