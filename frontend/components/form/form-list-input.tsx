'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';
import { useFormContext } from './form-context';
import { cn } from '@/lib/utils/cn.utils';

interface FormListInputProps {
  name: string;
  label: string;
  placeholder?: string;
  maxItems?: number;
  required?: boolean;
  className?: string;
}

export function FormListInput({
  name,
  label,
  placeholder,
  maxItems = 10,
  required = false,
  className
}: FormListInputProps) {
  const { form } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  
  const currentValues = form.watch(name) || [];
  const error = form.formState.errors[name]?.message as string | undefined;
  
  const trimmedValue = inputValue.trim();
  const canAddItem = trimmedValue && 
    !currentValues.includes(trimmedValue) && 
    currentValues.length < maxItems;

  const handleAddItem = () => {
    if (canAddItem) {
      const newValues = [...currentValues, trimmedValue];
      form.setValue(name, newValues);
      setInputValue('');
    }
  };

  const handleRemoveItem = (index: number) => {
    const newValues = currentValues.filter((_: any, i: number) => i !== index);
    form.setValue(name, newValues);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={cn(
            error && "border-destructive focus-visible:ring-destructive"
          )}
        />
        <Button
          type="button"
          onClick={handleAddItem}
          disabled={!canAddItem}
          variant="outline"
          size="icon"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {currentValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {currentValues.map((item: string, index: number) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {maxItems && (
        <p className="text-xs text-muted-foreground">
          {currentValues.length}/{maxItems} items
        </p>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
