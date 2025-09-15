import { videoSchema } from '@/schemas/video-schema'
import { z } from 'zod'

export type videoSchemaDTO = z.infer<typeof videoSchema>

export type DTOVideo = {
  id?: string
  description: string
  title: string
  videoURL: File
  photoURL:File 
  duration?: string
  createdAt?: string
}
