import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - VEED Videos',
  description: "The page you're looking for doesn't exist."
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
