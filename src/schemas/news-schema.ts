import { z } from 'zod'

export const newsSchema = z.object({
  title: z.string().min(1, 'Digite um título'),
  author: z.string().min(2, 'Digite o nome do Autor'),
  content: z.string().min(1, 'Digite o conteúdo'),
  photoURLs: z.array(z.instanceof(File)),
})
