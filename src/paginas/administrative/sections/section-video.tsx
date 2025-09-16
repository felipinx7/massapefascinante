'use client'

import { useEffect, useState } from 'react'
import { NameAdminstrative } from '../components/layouts/header-info-adm'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { IconClosed } from '@/assets/icons/icone-closed'

import { CardVideos } from '../components/layouts/card-videos'
import { videoDTO , videoSchemaDTO } from '@/dto/video/DTOVideo'
import { videoSchema } from '@/schemas/video-schema'

import CreateVideo from '@/services/routes/video/create-video'

import GetVideos from '@/services/routes/video/get-videos'

import DeleteVideo from '@/services/routes/video/delete-video'

export const SectionVideo = () => {
  const [isVisibility, setIsVisibility] = useState(false)
  const [showVideos, setShowVideos] = useState<videoDTO[] | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [filteredVideos, setFilteredVideos] = useState<videoDTO[] | null>(null)

  const handleVisibility = () => {
    setIsVisibility((prev) => !prev)
  }

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema),
  })

  async function onSubmit(data: videoSchemaDTO) {
    const response = await CreateVideo(data)
    console.log('Resposta da API:', response)
    reset()
    setIsVisibility(false)
  }

  useEffect(() => {
    const fetchInfoVideos = async () => {
      const res = await GetVideos()
      setShowVideos(res)
    }

    fetchInfoVideos()
  }, [])

  const handleFilter = () => {
    if (!searchValue.trim()) {
      setFilteredVideos(null)
      return
    }

    const filtered = showVideos?.filter((place) =>
      place.title.toLowerCase().includes(searchValue.toLowerCase()),
    )

    setFilteredVideos(filtered ?? [])
  }

  useEffect(() => {
    handleFilter()
  }, [searchValue])


  const FunctiondeleteVideo = async (id: string) => {
    await DeleteVideo(id)
    console.log('Card Excluido com sucesso!')

    // Update list of Videos with alters
    setShowVideos((prev) => prev?.filter((video) => video.id !== id) ?? null)
    setFilteredVideos((prev) => prev?.filter((video) => video.id !== id) ?? null)
  }

  return (
    <section className="w-[cacl(100%-20%)]">
      <div className="max-lg:hidden">
        <NameAdminstrative SibeBarMobile={false} />
      </div>

      {/* Inpurt for Search */}
      <div className="relative w-[80%] max-lg:w-full">
        <input
          type="text"
          placeholder="Pesquise pelo vídeo"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[100%] rounded-[1rem] bg-primarygray p-5 outline-none focus:border-[2px] focus:border-primargreen"
        />
        <button className="absolute right-2 top-1.5 w-auto rounded-[1rem] bg-primargreen p-3.5 font-[700] text-white">
          Buscar
        </button>
      </div>

      {/* Botton of add location */}
      <button
        onClick={handleVisibility}
        className="mt-4 rounded bg-primargreen p-3 font-bold text-white"
      >
        Adicionar um Video
      </button>

      {/* Modal */}
      <div
        className={`${
          isVisibility ? 'fixed' : 'hidden'
        } inset-0 z-50 flex items-center justify-center bg-black/50`}
      >
        <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">New Video</h2>
              <button
                onClick={handleVisibility}
                type="button"
                className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
              >
                <IconClosed />
              </button>
            </div>

            {/* Upload de fotos */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Upload Photos</label>
              <div className="relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">
                <Controller
                  name="photoURL"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        onChange={(e) => {
                          const files = e.target.files[0]
                          field.onChange(files ? files : null)
                        }}
                      />
                      <span>Click to upload images</span>
                    </>
                  )}
                />
              </div>
              {errors.photoURL && (
                <p className="text-sm text-red-500">{errors.photoURL.message}</p>
              )}
            </div>

            {/* Upload de videos */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Upload Video</label>
              <div className="relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">
                <Controller
                  name="videoURL"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        type="file"
                        multiple
                        accept="video/*"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        onChange={(e) => {
                          const files = e.target.files[0]
                          field.onChange(files ? files : null)
                        }}
                      />
                      
                      <span>Click to upload Video</span>
                    </>
                  )}
                />
              </div>
              {errors.videoURL && (
                <p className="text-sm text-red-500">{errors.videoURL.message}</p>
              )}
            </div>

            {/* Campos de nome e telefone */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">title</label>
                <input
                  {...register('title')}
                  type="text"
                  placeholder="Example: Beach Restaurant"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title?.message}</p>}
              </div>

            </div>

            
            {/* Descrição */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                placeholder="Tell more about this video..."
                rows={3}
                className="w-full resize-none rounded border border-gray-300 p-2 text-sm"
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Botão de envio */}
            <div>
              <button
                type="submit"
                className="w-full rounded bg-primargreen px-4 py-2 font-semibold text-white transition hover:bg-green-600"
              >
                Register Video
              </button>
            </div>
          </form>
        </article>
      </div>

      {/* Filtered cards or all */}
      <div className="mt-4 grid min-h-[80vh] w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-10 overflow-y-auto">
        {(filteredVideos ?? showVideos)?.length ? (
          (filteredVideos ?? showVideos)?.map((place, index) => (
            <CardVideos
              key={index}
              {...place}
              handleDeletePlace={() => FunctiondeleteVideo(place.id)}
            />
          ))
        ) : (
          <p className="col-span-full text-center">Nenhum local encontrado.</p>
        )}
      </div>
    </section>
  )
}
