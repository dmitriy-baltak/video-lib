import React from 'react';
import { FileVideo } from 'lucide-react';
import { cn } from '@/lib/utils/cn.utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  variant?: 'default' | 'minimal';
  className?: string;
}

export function EmptyState({
  icon,
  title = 'No items found',
  message = 'Get started by creating your first item.',
  variant = 'default',
  className
}: EmptyStateProps) {
  const defaultIcon = <FileVideo className="w-12 h-12 text-muted-foreground" />;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center",
      variant === 'default' ? "py-16 px-6" : "py-12 px-4",
      className
    )}>
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted/50">
        {icon || defaultIcon}
      </div>
      
      <h3 className="text-lg font-medium text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground max-w-md">
        {message}
      </p>
    </div>
  );
}
