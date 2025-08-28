'use client'

import { IconeSetaVoltando } from '@/assets/icons/icone-de-seta-voltando'
import { useParams, useRouter } from 'next/navigation'
import { CardNoticiasDTO } from '@/dto/news/DTO-news'
import { Footer } from '../home-page/sections/footer'
import { GetAllNews } from '@/services/routes/news/getAll'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

import CardNoticiasRelevantes from './components/card-noticias-relevantes'
import CardMaisNoticias from './components/card-mais-noticias'

import '../../config/globals.css'
import { GetUniqueNews } from '@/services/routes/news/getUnique'
import { useEffect, useState } from 'react'

import { baseUrlPhoto } from '@/utils/base-url-photos'

export function PaginaNoticiaUnica() {
  const params = useParams()
  const { id } = params
  //Estados

  const [news, setNews] = useState<CardNoticiasDTO[]>()
  const [uniqueNews, setUniqueNews] = useState<CardNoticiasDTO>()

  const router = useRouter()

  //Funções
  useEffect(() => {
    async function FetchNews() {
      const res = await GetAllNews()
      const resNew = await GetUniqueNews(id?.toString())
      console.log('Resposta da API', res.response)
      setUniqueNews(resNew.response);

      setNews(res.response)
    }
    FetchNews()
  }, [id])
  const handleChangePage = () => {
    router.back()
  }
  // HTML

  return (
    <main className="flex h-full w-full flex-col items-center gap-4">
      {/* header  */}
      <header className="flex w-full items-center justify-center bg-primargreen">
        <div className="m-0 flex w-[100%] max-w-[1280px] items-center justify-start gap-3 px-3 py-4">
          <div onClick={handleChangePage} className="cursor-pointer">
            <IconeSetaVoltando className="h-[30px] w-[30px]" />
          </div>
          <h1 className="text-[1.3rem] font-bold text-white">Voltar</h1>
        </div>
      </header>

      {/* container main  */}
      <section className="m-0 mt-3 h-full w-[100%] max-w-[1280px] px-5">
        <h1 className="text-[1.5rem] font-bold text-primargreen max-md:text-center">
          Veja as notícias mais relevantes de Massapê!
        </h1>
        {/* container noticias  */}
        <div className="mt-3 flex w-full flex-col items-baseline rounded-md">
          {/* container noticias relevantes  */}
          <div className="flex h-auto w-full items-start justify-between gap-3 max-lg:flex-col">
       {uniqueNews != undefined ? (     <div className="flex w-full flex-col items-center justify-start gap-3">
                <div
                  style={{
                    backgroundImage: `url(${baseUrlPhoto('news', uniqueNews?.photo[0]?.url)})`,
                    backgroundSize: 'cover',
                  }}
                  className="relative flex h-[500px] w-full flex-col items-start justify-end overflow-hidden rounded-[5px] bg-slate-950 p-8 max-lg:h-[300px] max-lg:w-full"
                ></div>


              <div className="flex flex-row items-center justify-between">
                <h1>{uniqueNews?.author}</h1>
                <h1>{uniqueNews?.date}</h1>
              </div>
              <div className="flex w-full justify-start bg-slate-950 text-3xl font-bold">
                {uniqueNews?.title}
              </div>
              <div className="flex w-full justify-start bg-slate-950 text-base">
                {uniqueNews?.content}
              </div>
            </div> ) : (
              <div>Carregando...</div>
            )}

            {/* container de noticias relevantes  */}
            <div className="flex w-[40%] flex-col gap-5 overflow-x-auto max-lg:mt-4 max-lg:w-full max-lg:flex-row max-lg:gap-3">
              {news
                ?.filter((card) => card.id !== uniqueNews?.id)
                ?.slice(0, 5)
                ?.map((card) => (
                  <div
                    key={card.id}
                    className="flex"
                    onClick={() => router.push(`/noticias/${card.id}`)}
                  >
                    {' '}
                    <CardNoticiasRelevantes {...card} />{' '}
                  </div>
                ))}
            </div>
          </div>
          {/* container mais noticias */}
          <div className="mt-4 flex w-full flex-col">
            <h1 className="text-[1.5rem] font-bold text-primargreen">Mais Notícias</h1>

            {/* container das demais noticias */}
            {/* grid-cols-[repeat(auto-fill,minmax(280px,1fr))] */}
            <div className="mt-4">
              <Swiper
                modules={[Navigation]}
                pagination={{ clickable: true }}
                breakpoints={{
                  0: {
                    slidesPerView: 3,
                  },
                  600: {
                    slidesPerView: 3.5,
                  },
                  720: {
                    slidesPerView: 4,
                  },
                  860: {
                    slidesPerView: 4.3,
                  },
                }}
                className="gap-8 rounded-xl px-8 py-8"
              >
                {news
                  ?.filter((card) => card.id !== uniqueNews?.id)
                  ?.slice(5)
                  ?.map((card) => (
                    <SwiperSlide key={card.title}>
                      <div
                        className="w-68 mr-12 flex h-80 items-start justify-center"
                        onClick={() => router.push(`/noticias/${card.id}`)}
                      >
                        <CardMaisNoticias key={card.title} {...card} />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </main>
  )
}
