'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { IconPencil } from '@/assets/icons/icon-pencil'
import { IconTrash } from '@/assets/icons/icon-trash'
import { IconClosed } from '@/assets/icons/icone-closed'
import { backgroundloginpage } from '@/assets/image'

import { baseUrlPhoto } from '@/utils/base-url-photos'
import { videoDTO } from '@/dto/video/DTOVideo'
import { videoSchema } from '@/schemas/video-schema'
import UpdateVideo from '@/services/routes/video/update-video'

export const CardVideos = (props: videoDTO) => {
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema),
  })

  // Toggle modal
  const handleOpenModalUpdate = () => {
    if (!showModalUpdate) {
      // Abrindo modal → reset form com dados existentes
      reset({
        title: props.title || '',
        description: props.description || '',
      })

      if (props.photoURL) {
        const url = baseUrlPhoto('place', props.photoURL)
        setPreviewImage(url)
        setValue('photoURL', props.photoURL) // string (da API)
      } else {
        setPreviewImage(undefined)
        setValue('photoURL', undefined)
      }
    } else {
      // Fechando modal → limpar tudo
      reset()
      setPreviewImage(undefined)
    }

    setShowModalUpdate((prev) => !prev)
  }

  // Submit
  const onSubmit = async (data: z.infer<typeof videoSchema>) => {
    try {
      const response = await UpdateVideo(props.id, data)
      console.log('Update successful!', response)

      reset()
      setPreviewImage(undefined)
      setShowModalUpdate(false)
    } catch (error) {
      console.error('Error updating video:', error)
    }
  }

  // Preview nova imagem
  const handlePreviewImage = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreviewImage(url)
    setValue('photoURL', file)
  }

  // Remover preview
  const handleRemovePreviewImage = () => {
    if (previewImage) URL.revokeObjectURL(previewImage)
    setPreviewImage(undefined)
    setValue('photoURL', undefined)
  }

  // Foto principal do card
  const photo = props.photoURL
    ? baseUrlPhoto('place', props.photoURL) || backgroundloginpage
    : backgroundloginpage

  return (
    <article className="flex h-[300px] w-[280px] flex-col rounded-[0.9rem] shadow-shadowCardEventLocation">
      {/* Cover image */}
      <div className="relative h-[80%] w-full">
        <Image
          src={photo}
          alt="Video cover"
          fill
          className="h-full w-full rounded-tl-[0.9rem] rounded-tr-[0.9rem] object-cover"
        />

        <div className="absolute bottom-0 right-0 flex w-full items-center justify-end gap-3 p-2">
          <button
            onClick={() => props.handleDeletePlace?.(props.id)}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
            title="Delete video"
          >
            <IconTrash />
          </button>

          <button
            onClick={handleOpenModalUpdate}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
            title="Edit video"
          >
            <IconPencil />
          </button>
        </div>
      </div>

      {/* Summary info */}
      <div className="flex h-[70%] flex-col p-3">
        <h1 className="w-[95%] truncate text-[1.1rem] font-medium text-black">{props.title}</h1>
        <p className="line-clamp-3 h-full text-secundarygray900">{props.description}</p>
      </div>

      {/* Modal */}
      {showModalUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Atualizar vídeo</h2>
                <button
                  onClick={handleOpenModalUpdate}
                  type="button"
                  className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
                  title="Close modal"
                >
                  <IconClosed />
                </button>
              </div>

              {/* Upload única foto */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Foto do Vídeo
                </label>

                {!previewImage ? (
                  <Controller
                    name="photoURL"
                    control={control}
                    render={() => (
                      <div className="relative flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 text-sm text-gray-500">
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handlePreviewImage(file)
                          }}
                          aria-label="Select image"
                        />
                        <span>Clique e selecione a foto</span>
                      </div>
                    )}
                  />
                ) : (
                  <div className="relative mt-2 h-[250px] w-full overflow-hidden rounded-md">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePreviewImage}
                      className="absolute right-2 top-2 z-10 rounded bg-white p-1 text-gray-700 hover:text-red-600"
                      title="Remover imagem"
                    >
                      <IconTrash />
                    </button>
                  </div>
                )}

                {errors.photoURL && (
                  <p className="text-sm text-red-500">{errors.photoURL.message}</p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Título</label>
                <input
                  {...register('title')}
                  type="text"
                  placeholder="Exemplo: Winter Festival"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  aria-invalid={errors.title ? 'true' : 'false'}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  {...register('description')}
                  placeholder="Descrição aqui"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  rows={4}
                  aria-invalid={errors.description ? 'true' : 'false'}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              <button type="submit" className="w-full rounded bg-primargreen py-2 text-white">
                Atualizar Vídeo
              </button>
            </form>
          </article>
        </div>
      )}
    </article>
  )
}
