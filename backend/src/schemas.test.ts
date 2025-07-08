import { describe, it, expect } from 'vitest';
import { createVideoSchema } from './schemas.js';
import { ZodError } from 'zod';

describe('Schema Validation', () => {
  describe('createVideoSchema', () => {
    it('should validate valid data', () => {
      const validData = {
        title: 'Test Video',
        tags: ['test', 'video']
      };

      const result = createVideoSchema.parse(validData);
      expect(result).toEqual(validData);
    });

    it('should reject empty title', () => {
      const invalidData = {
        title: '',
        tags: ['test']
      };

      expect(() => {
        createVideoSchema.parse(invalidData);
      }).toThrow(ZodError);
    });

    it('should accept empty tags array', () => {
      const validData = {
        title: 'Test Video',
        tags: []
      };

      const result = createVideoSchema.parse(validData);
      expect(result).toEqual(validData);
    });
  });
});
