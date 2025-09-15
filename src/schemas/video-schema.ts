import { z } from 'zod'

export const videoSchema = z.object({
  title: z.string().min(3, 'O título precisa ser maior que 3 caracteres'),
  videoURL: z.instanceof(File),
  photoURL: z.instanceof(File),
  description: z.string().min(4, 'A descrição precisa ser maior que 4 caracteres'),
})

