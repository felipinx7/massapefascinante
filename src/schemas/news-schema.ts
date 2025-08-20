import { z } from 'zod';

export const newsSchema = z.object({
  title: z.string({ required_error: 'Name is required' }).regex(/^[^<>]*$/, 'Sem tags HTML'),
  author: z.string({ required_error: 'Name is required' }).regex(/^[^<>]*$/, 'Sem tags HTML'),
  content: z
    .string({ required_error: 'Content is required' })
    .regex(/^[^<>]*$/, 'Sem tags HTML'),
  photoURLs: z.array(z.instanceof(File)),
  date: z.string(),
})