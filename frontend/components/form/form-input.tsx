'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from './form-context';
import { cn } from '@/lib/utils/cn.utils';

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function FormInput({
  name,
  label,
  placeholder,
  required = false,
  className
}: FormInputProps) {
  const { form } = useFormContext();
  const error = form.formState.errors[name]?.message as string | undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <Input
        id={name}
        placeholder={placeholder}
        {...form.register(name)}
        className={cn(
          error && "border-destructive focus-visible:ring-destructive"
        )}
      />
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
