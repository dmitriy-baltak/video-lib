'use client';

import { useGetVideosQuery } from '@/lib/slice/videos-api.slice';
import { VideoGrid } from './video-grid';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { selectSortBy, setSortBy } from '@/lib/slice/ui.slice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ErrorState } from '@/components/states/error-state';
import { SortOrder } from '@/lib/slice/videos-api.slice';

function getErrorMessage(error: any): string {
  if (error && 'status' in error && error.status === 404) {
    return 'No videos found.';
  }
  return 'Something went wrong while loading the videos.';
}

export function VideoLibrary() {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSortBy);
  const { data, error, isLoading, refetch } = useGetVideosQuery(sortBy);

  const handleSortChange = (value: string) => {
    dispatch(setSortBy(value as SortOrder));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Video Library</h1>
          <p className="text-muted-foreground">Browse and manage your video collection</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error ? (
        <ErrorState
          title="Error Loading Videos"
          message={getErrorMessage(error)}
          onRetry={() => refetch()}
        />
      ) : (
        <VideoGrid videos={data?.videos || []} loading={isLoading} />
      )}
    </div>
  );
}
