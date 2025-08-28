import { IconTrash } from '@/assets/icons/icon-trash'
import { IconClosed } from '@/assets/icons/icone-closed'
import { CardNoticiasDTO, newsDTO } from '@/dto/news/DTO-news'
import { newsSchema } from '@/schemas/news-schema'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateNews } from '@/services/routes/news/update'
import updatePhoto from '@/services/routes/news/update-photo'

interface ModalUpdateNewsProps {
  handleVisibilityModalUpdate: () => void
  openModalVisibilityModalUpdate: boolean
  data: CardNoticiasDTO
}

export default function ModalUpdateNews(props: ModalUpdateNewsProps) {
  // State utils in componente
  const [preview, setPreview] = useState<string | null>(
    baseUrlPhoto('news', props.data.photo?.[0]?.url),
  )
  const [removePhoto, setRemovePhoto] = useState(false)
  

  // Function Utils in componente
  function handleChangePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    const arrayFile = Array.from(event.target.files)
    console.log('Dados da foto', arrayFile)
    setPreview(URL.createObjectURL(arrayFile[0]))
    setValue('photoURLs', arrayFile, { shouldValidate: true })

    setRemovePhoto(false)
  }

  function deletePreviewPhoto() {
    setPreview(null)
    setRemovePhoto(true)
  }

  function handleVisibilityModal() {
    setPreview(null)
    setRemovePhoto(false)
    props.handleVisibilityModalUpdate()
  }

  console.log(props.data)

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof newsSchema>>({
    resolver: zodResolver(newsSchema),
    mode: 'onChange',
    defaultValues: {
    title: props.data.title,
    author: props.data.author,
    content: props.data.content,
  }
  })

  async function onSubmit(data: newsDTO, ) {
    console.log('data do request:', data)
    if (removePhoto) register('photoURLs', { value: [] })
    const response = await updateNews(data)
    console.log('Resposta da API:', response)
    reset()
    handleVisibilityModal()
  }

  return ReactDOM.createPortal(
    <section
      className={`fixed inset-0 z-0 flex items-center justify-center bg-black/55 transition-opacity duration-500 ${
        props.openModalVisibilityModalUpdate ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <article
        className={`${props.openModalVisibilityModalUpdate ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} relative z-[20000] flex max-h-[90vh] w-[95%] max-w-lg flex-col gap-4 overflow-y-auto rounded-xl bg-white p-5 px-5 py-4 shadow-lg transition-all duration-500 ease-in-out`}
      >
        {/* container Header  */}
        <div className="z-50 flex w-full items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Atualizar Notícia</h1>
          <div
            className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
            onClick={() => props.handleVisibilityModalUpdate()}
          >
            <IconClosed />
          </div>
        </div>

        {/* container Formulário  */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Upload de fotos */}
          <div className="">
            <label className="relative mb-1 block text-sm font-medium text-gray-700">
              Adicionar Foto
            </label>
            {preview ? (
              //  Preview of Photo
              <div className="h-[250px] w-full rounded-sm relative">
                <img
                  className="h-full w-full rounded-[1rem] object-cover"
                  src={preview}
                  alt="Visualização da Foto"
                />

                <div className="absolute left-0 top-0 h-full w-full p-2">
                  <div className="flex w-full items-end justify-end">
                    <div
                      onClick={deletePreviewPhoto}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[5.97px] bg-white transition-all duration-500 hover:bg-primaryWhite500"
                    >
                      <IconTrash />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">
                <input
                  type="file"
                  {...register('photoURLs')}
                  onChange={handleChangePhoto}
                  accept="image/*"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />

                <span>Clique aqui para adicionar Foto</span>
              </div>
            )}
            {errors.photoURLs && <p className="text-sm text-red-500">{errors.photoURLs.message}</p>}
          </div>

          {/* Campos de Titulo da noticia e conteúdo da noticia */}
          <div className="flex flex-col gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Titulo da Noticia
              </label>
              <input
                {...register('title')}
                type="text"
                placeholder="Digite o nome da notícia"
                className="w-full rounded border border-gray-300 p-2 text-sm"
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Conteúdo da Noticia
              </label>
              <textarea
                {...register('content')}
                className="h-[100px] w-full resize-none rounded border border-gray-300 p-2 text-sm"
                placeholder="Digite o conteúdo da noticia"
                id=""
              ></textarea>
              {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
            </div>
          </div>

          {/* Campos de nome do autor */}
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">Nome do Autor</label>
            <input
              {...register('author')}
              type="text"
              placeholder="Nome do autor"
              className="w-full rounded border border-gray-300 p-2 text-sm"
            />
            {errors.author && <p className="text-sm text-red-500">{errors.author.message}</p>}
          </div>

          {/* Botão de envio */}
          <div>
            <button
              type="submit"
              className={`w-full cursor-pointer rounded bg-primargreen px-4 py-2 font-semibold text-white transition hover:bg-blue-600`}
            >
              Atualizar notícia
            </button>
          </div>
        </form>
      </article>
    </section>,

    document.body,
  )
}
