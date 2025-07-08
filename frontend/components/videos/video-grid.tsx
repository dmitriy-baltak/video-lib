'use client';

import { Video } from '@/lib/slice/videos-api.slice';
import { VideoCard } from './video-card';
import { EmptyState } from '@/components/states/empty-state';
import { VideoGridSkeleton } from './video-grid-skeleton';
import { FileVideo } from 'lucide-react';

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
}

export function VideoGrid({ videos, loading = false }: VideoGridProps) {
  if (loading) {
    return <VideoGridSkeleton />;
  }

  if (videos.length === 0) {
    return (
      <EmptyState
        icon={<FileVideo className="w-12 h-12 text-muted-foreground" />}
        title="No videos found"
        message="Your video library is empty. Create your first video to get started."
        variant="default"
      />
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video, index) => (
        <VideoCard 
          key={video.id} 
          video={video}
          index={index}
        />
      ))}
    </div>
  );
}
