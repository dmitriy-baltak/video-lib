import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VideoCard } from './video-card';
import { mockTestVideo } from '../../__tests__/fixtures';

// Mock the formatDate function to test integration
vi.mock('@/lib/utils/video.utils', () => ({
  formatDate: vi.fn(() => 'Mocked Date'),
}));

describe('VideoCard', () => {
  it('should show image loading state and call formatDate', async () => {
    render(<VideoCard video={mockTestVideo} />);
    
    // Test that formatDate utility is called with correct date
    const { formatDate } = await import('@/lib/utils/video.utils');
    expect(formatDate).toHaveBeenCalledWith(mockTestVideo.created_at);
    
    // Test image loading behavior
    const image = screen.getByAltText('Test Video thumbnail');
    expect(image).toHaveClass('opacity-0'); // Should start with loading state
    
    // Test that video data is displayed
    expect(screen.getByText('Test Video')).toBeInTheDocument();
    expect(screen.getByText('Mocked Date')).toBeInTheDocument();
  });

  it('should prioritize loading for early videos', () => {
    render(<VideoCard video={mockTestVideo} index={5} />);
    
    const image = screen.getByAltText('Test Video thumbnail');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('should lazy load for later videos', () => {
    render(<VideoCard video={mockTestVideo} index={20} />);
    
    const image = screen.getByAltText('Test Video thumbnail');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});
