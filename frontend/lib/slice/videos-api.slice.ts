import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type SortOrder = 'newest' | 'oldest';

export interface Video {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
  duration: number;
  views: number;
  tags: string[];
}

export type CreateVideoData = Partial<Omit<Video, 'id'>> & {
  title: string;
}

export interface VideoListResponse {
  videos: Video[];
  total: number;
}

export const videosApiSlice = createApi({
  reducerPath: 'videosApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3007' 
  }),
  tagTypes: ['Video'],
  endpoints: (builder) => ({
    getVideos: builder.query<VideoListResponse, SortOrder>({
      query: (sortBy = 'newest') => `/videos?sortBy=${sortBy}`,
      providesTags: ['Video'],
    }),
    createVideo: builder.mutation<{ video: Video; message: string }, CreateVideoData>({
      query: (data) => ({
        url: '/videos',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Video'],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useCreateVideoMutation,
} = videosApiSlice;
