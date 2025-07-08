import { z } from 'zod';

export const createVideoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  tags: z.array(z.string()).max(12, 'Maximum 12 tags allowed'),
});

export type CreateVideoData = z.infer<typeof createVideoSchema>;
