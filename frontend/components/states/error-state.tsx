import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils/cn.utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  variant?: 'page' | 'section' | 'inline';
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
  variant = 'section',
  className
}: ErrorStateProps) {
  const baseClasses = "flex flex-col items-center justify-center text-center";
  
  const variantClasses = {
    page: "min-h-[50vh] px-4",
    section: "py-12 px-6",
    inline: "py-6 px-4"
  };

  return (
    <div className={cn(
      baseClasses,
      variantClasses[variant],
      "rounded-lg border border-destructive/20 bg-destructive/5",
      className
    )}>
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-destructive/10">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
