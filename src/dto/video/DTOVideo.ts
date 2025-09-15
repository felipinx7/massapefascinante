import { videoSchema } from '@/schemas/video-schema'
import { z } from 'zod'

export type videoSchemaDTO = z.infer<typeof videoSchema>

export type videoDTO = {
  id: string
  description: string
  title: string
  videoURL: string
  photoURL: string
  duration?: string
  createdAt?: string
  handleDeletePlace?: (id: string) => void

}
