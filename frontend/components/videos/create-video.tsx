'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useCreateVideoMutation } from '@/lib/slice/videos-api.slice';
import { FormProvider } from '@/components/form/form-context';
import { FormInput } from '@/components/form/form-input';
import { FormListInput } from '@/components/form/form-list-input';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const MAX_TAGS = 12;

const videoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  tags: z.array(z.string()).max(MAX_TAGS, `Maximum ${MAX_TAGS} tags allowed`),
});

type VideoFormData = z.infer<typeof videoSchema>;

export function CreateVideo() {
  const router = useRouter();
  const [createVideo] = useCreateVideoMutation();

  const handleSubmit = async (data: VideoFormData) => {
    await createVideo({
      title: data.title,
      tags: data.tags,
    }).unwrap();

    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Videos
        </Link>
        <h1 className="text-3xl font-bold">Create New Video</h1>
        <p className="text-muted-foreground mt-2">
          Add a new video to your library
        </p>
      </div>

      <FormProvider
        schema={videoSchema}
        defaultValues={{ tags: [] }}
        onSubmit={handleSubmit}
        submitLabel="Create Video"
        className="space-y-6"
      >
        <FormInput
          name="title"
          label="Title"
          placeholder="Enter video title"
          required
        />
        <FormListInput
          name="tags"
          label="Tags"
          placeholder="Add a tag"
          maxItems={MAX_TAGS}
        />
      </FormProvider>
    </div>
  );
}
