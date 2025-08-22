'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { IconPencil } from '@/assets/icons/icon-pencil'
import { IconTrash } from '@/assets/icons/icon-trash'
import { IconClosed } from '@/assets/icons/icone-closed'
import { backgroundloginpage } from '@/assets/image'
import { placeSchema } from '@/schemas/places-schema'
import { updatePlace } from '@/services/routes/places/update-place'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import { newsSchema } from '@/schemas/news-schema'
import { CardNoticiasDTO } from '@/dto/news/DTO-news'

export const CardNews = (props: CardNoticiasDTO) => {
  // State utils in component
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const {
    control,
    register,
    // handleSubmit,
    // reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof newsSchema>>({ resolver: zodResolver(newsSchema) })
  const photo = props.photoURLs?.[0]?.url
    ? baseUrlPhoto('place', props.photoURLs[0].url) || backgroundloginpage
    : backgroundloginpage

  // Functions Utils in Component
  const handleOpenModalUpdate = () => {}

  // const onSubmit = async (data: z.infer<typeof placeSchema>) => {
  //   try {
  //     const response = await updatePlace(props.id ?? '', data)
  //     console.log('Update successful!', response)
  //     reset()
  //     setPreviewImages([])
  //     setShowModalUpdate(false)
  //   } catch (error) {
  //     console.error('Error updating place:', error)
  //   }
  // }

  const handlePreviewImages = (files: File[]) => {
    const urls = files.map((file) => URL.createObjectURL(file))
    setPreviewImages(urls)

    setValue('photoURLs', files)
  }

  return (
    <article className="flex h-[300px] w-[280px] flex-col rounded-[0.9rem] shadow-shadowCardEventLocation">
      {/* Cover image with action buttons */}
      <div className="relative h-[80%] w-full">
        <img
          src={photo}
          alt="Place photo"
          className="h-full w-full rounded-tl-[0.9rem] rounded-tr-[0.9rem] object-cover"
        />

        <div className="absolute bottom-0 right-0 flex w-full items-center justify-end gap-3 p-2">
          {/* Delete button */}
          <button
            // onClick={() => props.handleDeleteNoticie()}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
            title="Delete place"
          >
            <IconTrash />
          </button>

          {/* Edit button */}
          <button
            onClick={handleOpenModalUpdate}
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[0.3rem] bg-white"
            title="Edit place"
          >
            <IconPencil />
          </button>
        </div>
      </div>

      {/* Summary info */}
      <div className="flex h-[70%] flex-col p-3">
        <h1 className="w-[95%] truncate text-[1.1rem] font-medium text-black">{props.title}</h1>
        <p className="line-clamp-3 h-full text-secundarygray900">{props.author}</p>
      </div>

      {/* Update modal */}
      {showModalUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
            {/* onSubmit={handleSubmit(onSubmit)} */}
            <form className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Atualizar Lugar</h2>
                <button
                  onClick={handleOpenModalUpdate}
                  type="button"
                  className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
                  title="Close modal"
                >
                  <IconClosed />
                </button>
              </div>

              {/* Photos input and preview */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Update Photos
                </label>

                {previewImages.length === 0 ? (
                  <Controller
                    name="photoURLs"
                    control={control}
                    render={({ field }) => (
                      <div className="relative flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 text-sm text-gray-500">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          onChange={(e) => {
                            const files = e.target.files
                            const fileArray = files ? Array.from(files) : []
                            field.onChange(fileArray)
                            handlePreviewImages(fileArray)
                          }}
                          aria-label="Select images"
                        />
                        <span>Clique e selecione a foto</span>
                      </div>
                    )}
                  />
                ) : (
                  <Swiper spaceBetween={10} slidesPerView={1} className="mt-2 h-[250px]">
                    {previewImages.map((url, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative h-[250px] w-full overflow-hidden rounded-md">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="object-cover"
                          />
                          {/* Remove image button */}
                          <button
                            type="button"
                            onClick={() => console.log('Olá')}
                            className="absolute right-2 top-2 z-10 rounded bg-white p-1 text-gray-700 hover:text-red-600"
                            title="Remove image"
                          >
                            <IconTrash />
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}

                {errors.photoURLs && (
                  <p className="text-sm text-red-500">{errors.photoURLs.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  {...register('title')}
                  type="text"
                  placeholder="@event"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  aria-invalid={errors.title ? 'true' : 'false'}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Localização</label>
                <input
                  {...register('author')}
                  type="text"
                  placeholder="Location here"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  aria-invalid={errors.author ? 'true' : 'false'}
                />
                {errors.author && <p className="text-sm text-red-500">{errors.author.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  {...register('content')}
                  placeholder="Description here"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  rows={4}
                  aria-invalid={errors.content ? 'true' : 'false'}
                />
                {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
              </div>

              {/* Submit button */}
              <button type="submit" className="w-full rounded bg-primargreen py-2 text-white">
                Atualizar Local
              </button>
            </form>
          </article>
        </div>
      )}
    </article>
  )
}
