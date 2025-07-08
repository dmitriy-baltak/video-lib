import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn.utils';

interface FormActionsProps {
  submitLabel?: string;
  isSubmitting?: boolean;
  error?: string | null;
  disabled?: boolean;
  submitVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

export function FormActions({
  submitLabel = 'Submit',
  isSubmitting = false,
  error,
  disabled = false,
  submitVariant = 'default',
  className
}: FormActionsProps) {
  const loadingLabel = isSubmitting ? `${submitLabel}...` : submitLabel;

  return (
    <div className={cn("space-y-4", className)}>
      {error && (
        <div className="p-4 border border-destructive bg-destructive/10 rounded-md">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isSubmitting || disabled} 
        variant={submitVariant}
        className="w-full"
      >
        {loadingLabel}
      </Button>
    </div>
  );
}
