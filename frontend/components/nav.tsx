import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const Nav = () => {
  return (
    <nav className="container mx-auto px-4 border-b">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          VEED Videos
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/create">
            <Button>Upload Video</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
