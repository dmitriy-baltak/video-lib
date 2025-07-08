'use client';

import React, { createContext, useContext, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormActions } from './form-actions';

interface FormContextValue {
  form: UseFormReturn<any>;
  isSubmitting: boolean;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form components must be used within a Form provider');
  }
  return context;
};

interface FormProviderProps {
  schema: z.ZodSchema<any>;
  defaultValues?: Record<string, any>;
  onSubmit: (data: any) => Promise<void> | void;
  submitLabel?: string;
  submitVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  children: React.ReactNode;
  className?: string;
  showActions?: boolean;
}

export function FormProvider({
  schema,
  defaultValues,
  onSubmit,
  submitLabel = 'Submit',
  submitVariant = 'default',
  children,
  className,
  showActions = true
}: FormProviderProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues
  });

  const handleSubmit = async (data: any) => {
    try {
      setSubmitError(null);
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    }
  };

  const contextValue: FormContextValue = {
    form,
    isSubmitting: form.formState.isSubmitting
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        {children}
        
        {showActions && (
          <FormActions
            submitLabel={submitLabel}
            isSubmitting={form.formState.isSubmitting}
            error={submitError}
            submitVariant={submitVariant}
          />
        )}
      </form>
    </FormContext.Provider>
  );
} 