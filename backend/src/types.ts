
export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
  duration: number;
  views: number;
  tags: string[];
}

export interface VideoListResponse {
  videos: Video[];
  total: number;
}

export enum SortOrder {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}
