'use client'

import React, { useEffect, useState } from 'react'
import { NameAdminstrative } from '../components/layouts/header-info-adm'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconClosed } from '@/assets/icons/icone-closed'

import { newsSchema } from '@/schemas/news-schema'
import { CardNoticiasDTO, newsDTO } from '@/dto/news/DTO-news'
import { createNews } from '@/services/routes/news/create'
import { CardNews } from '../components/layouts/card-news'
import { GetAllNews } from '@/services/routes/news/getAll'

export const SectionNews = () => {
  const [isVisibility, setIsVisibility] = useState(false)
  const [showNews, setShowNews] = useState<CardNoticiasDTO[] | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [preview, setPreview] = useState<File | null>(null)
  const newsFilter = showNews?.filter(
    (news) =>
      news.title.toUpperCase().includes(searchValue.toUpperCase()) ||
      news.author.toUpperCase().includes(searchValue.toUpperCase()),
  )

  function handleChangePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    const arrayFile = Array.from(event.target.files)
    setValue('photoURLs', arrayFile, { shouldValidate: true })
    console.log('Dados da foto', arrayFile)
    setPreview(arrayFile[0])
  }

  const handleVisibility = () => {
    reset()
    setPreview(null)
    setIsVisibility((prev) => !prev)
  }

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof newsSchema>>({
    resolver: zodResolver(newsSchema),
    mode: 'onChange',
  })

  async function onSubmit(data: newsDTO) {
    const response = await createNews(data)
    console.log('Resposta da API:', response)
    reset()
    setIsVisibility(false)
  }

  useEffect(() => {
    console.log('Erros', errors)
  }, [errors])

  useEffect(() => {
    const fetchInfoEvents = async () => {
      const News = await GetAllNews()
      setShowNews(News)
    }

    fetchInfoEvents()
  }, [])

  return (
    <section className="w-[cacl(100%-20%)]">
      <div className="max-lg:hidden">
        <NameAdminstrative SibeBarMobile={false} />
      </div>

      {/* Input for Search */}
      <div className="relative w-[80%] max-lg:w-full">
        <input
          type="text"
          placeholder="Pesquise pela a Notícia"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[100%] rounded-[1rem] bg-primarygray p-5 outline-none focus:border-[2px] focus:border-primargreen"
        />
      </div>
      {/* Botton of add location */}
      <button
        onClick={handleVisibility}
        className="mt-4 rounded bg-primargreen p-3 font-bold text-white"
      >
        Adicionar uma Notícia
      </button>

      {/* Modal de criação de noticia */}
      <div
        className={`${
          isVisibility ? 'fixed' : 'hidden'
        } inset-0 z-50 flex items-center justify-center bg-black/50`}
      >
        <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Nova Notícia</h2>
              <button
                onClick={handleVisibility}
                type="button"
                className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
              >
                <IconClosed />
              </button>
            </div>

            {/* Upload de fotos */}
            <div className="">
              <label className="relative mb-1 block text-sm font-medium text-gray-700">
                Adicionar Foto
              </label>
              {preview ? (
                //  Preview of Photo
                <div className="h-[250px] w-full rounded-sm">
                  <img
                    className="h-full w-full rounded-[1rem] object-cover"
                    src={preview === null ? '' : URL.createObjectURL(preview)}
                    alt="Visualização da Foto"
                  />
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
              {errors.photoURLs && (
                <p className="text-sm text-red-500">{errors.photoURLs.message}</p>
              )}
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
                disabled={!isValid}
                type="submit"
                className={`w-full rounded bg-primargreen px-4 py-2 font-semibold transition ${isValid ? 'text-whitecursor-pointer bg-primargreen text-white' : 'bg-primaryWhite500 text-[#bab9b9]'}`}
              >
                Registra notícia
              </button>
            </div>
          </form>
        </article>
      </div>

      {/* Filtered cards or all */}
      <div className="relative mt-4 grid min-h-[80vh] w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-10 overflow-y-auto">
        {newsFilter ? (
          newsFilter.map((news) => (
            <CardNews
              key={news.id}
              {...news}
              handleDeleteNoticie={() => console.log('noticia deletada')}
            />
          ))
        ) : (
          <div className="absolute flex w-full items-center justify-center">
            <p>Nenhuma noticias encontradas</p>
          </div>
        )}
      </div>
    </section>
  )
}
