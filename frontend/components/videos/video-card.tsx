'use client';

import { useState } from 'react';
import { Video } from '@/lib/slice/videos-api.slice';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { formatDate } from '@/lib/utils/video.utils';

const PRIORITY_LOADING_THRESHOLD = 12;

interface VideoCardProps {
  video: Video;
  index?: number;
}

export function VideoCard({ video, index = 0 }: VideoCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const shouldPrioritize = index < PRIORITY_LOADING_THRESHOLD;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={video.thumbnail_url}
            alt={`${video.title} thumbnail`}
            fill
            className={`
              object-cover 
              transition-opacity duration-500 ease-out
              ${imageLoading ? 'opacity-0' : 'opacity-100'}
            `}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={shouldPrioritize}
            loading={shouldPrioritize ? 'eager' : 'lazy'}
            onLoad={() => setImageLoading(false)}
          />
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg line-clamp-2">
            {video.title}
          </h3>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(video.created_at)}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {video.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
