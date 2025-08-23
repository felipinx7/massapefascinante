'use client'

import { backgroundloginpage } from '@/assets/image'
import { CardNoticiasDTO } from '@/dto/news/DTO-news'
import { GetUniqueNews } from '@/services/routes/news/getUnique'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UniqueNews() {
  //State utils in section page
  const params = useParams()
  const noticieId = params.id
  const [news, setNews] = useState<CardNoticiasDTO>()
  const photo = baseUrlPhoto('news', String(news?.photo))

  useEffect(() => {
    async function fetchUniqueNews() {
      try {
        const data = await GetUniqueNews(String(noticieId))
        setNews(data.response)
        console.log('O id da Noticia é ', data.response)
      } catch (error) {
        console.log('Error ao pegar o id', error)
      }
    }
    fetchUniqueNews()
  }, [])

  useEffect(() => {
    console.log('O valor do Estado', news)
  }, [])

  return (
    <section className="w-full h-screen flex flex-col gap-4">
      <div className="m-0 flex w-full max-w-[1280px] flex-col gap-4">
        {/* photo  */}
        <div className="max-h-[280px] w-full overflow-hidden">
          <img
            src={photo ? photo.src : backgroundloginpage.src}
            className="h-full w-full rounded-[0.9rem] object-cover"
            alt="Imagem da Notícia"
          />
        </div>

        {/* data news  */}
        <div className="flex flex-col">
          <h1 className="text-[1.4rem] text-black/60">{news?.title}</h1>
          <p className="text-[1.1rem] text-black/30">{news?.content}</p>
        </div>

        {/* more news  */}
        <div></div>
      </div>
    </section>
  )
}
