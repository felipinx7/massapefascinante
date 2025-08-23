'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

import { backgroundloginpage } from '@/assets/image'
import { CardNoticiasDTO } from '@/dto/news/DTO-news'
import { GetUniqueNews } from '@/services/routes/news/getUnique'
import { baseUrlPhoto } from '@/utils/base-url-photos'

export default function UniqueNews() {
  // State for news data
  const params = useParams()
  const newsId = params.id
  const [news, setNews] = useState<CardNoticiasDTO>()

  // Generate photo URL
  const photo = baseUrlPhoto('news', String(news?.photo))

  //   useEffect(() => {
  //     async function fetchUniqueNews() {
  //       try {
  //         const data = await GetUniqueNews(String(newsId))
  //         setNews(data.response)
  //         console.log('O id da Noticia é ', data.response)
  //       } catch (error) {
  //         console.log('Erro ao pegar o id', error)
  //       }
  //     }
  //     fetchUniqueNews()
  //   }, [])

  //   useEffect(() => {
  //     console.log('O valor do Estado', news)
  //   }, [])

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-start">
      {/* Header */}
      <header className="flex w-full items-center justify-center bg-primargreen px-7 py-3">
        <div className="m-0 flex w-full max-w-[1280px] items-center justify-start px-4">
          <h2 className="text-xl font-bold text-white">{news?.title}</h2>
        </div>
      </header>

      {/* Main content */}
      <main className="m-0 flex w-full max-w-[1280px] flex-col items-start gap-6 px-4 py-6">
        {/* Photo */}
        <div
          className="w-full overflow-hidden rounded-xl"
          style={{ height: '350px', minHeight: '220px' }}
        >
          <Image
            src={photo || backgroundloginpage.src}
            alt="Imagem da Notícia"
            width={1200}
            height={500}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <article className="flex w-full flex-col">
          <h1 className="text-[2rem] font-bold text-black/70">{news?.title}</h1>
          <p className="mt-4 text-[1.1rem] leading-7 text-black/60">{news?.content}</p>
        </article>

        {/* More news */}
        <div></div>
      </main>
    </section>
  )
}
