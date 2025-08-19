'use client'

import { IconeSetaVoltando } from '@/assets/icons/icone-de-seta-voltando'
import { imagemnoticia } from '@/assets/image'
import { useRouter } from 'next/navigation'
import CardNoticiasRelevantes from './components/card-noticias-relevantes'
import { cardNoticiasDTO } from '@/dto/noticias/DTO-noticias-card'
import Image from 'next/image'
import { Footer } from '../home-page/sections/footer'
import CardMaisNoticias from './components/card-mais-noticias'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

import '../../config/globals.css'

import imagemCruel from "../../assets/image/banner-categoria-evento.jpg"

export default function PaginaNoticia() {
  // States usados no componente
  const router = useRouter()
  const noticias: cardNoticiasDTO[] = [
    {
      titulo: 'Tecnologia 5G chega a mais cidades brasileiras',
      data_de_envio: '2025-08-10',
      foto: 'https://picsum.photos/400/250?random=2',
      descricao:
        'O avanço da tecnologia 5G promete maior velocidade de conexão e novas oportunidades para empresas e usuários.',
    },
    {
      titulo: 'Inteligência Artificial revoluciona a medicina',
      data_de_envio: '2025-08-09',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Pesquisadores desenvolvem IA capaz de detectar doenças com mais precisão do que métodos tradicionais.',
    },
    {
      titulo: 'Carros elétricos ganham espaço nas ruas',
      data_de_envio: '2025-08-08',
      foto: 'https://picsum.photos/400/250?random=3',
      descricao:
        'As vendas de veículos elétricos aumentaram 35% no último trimestre, segundo dados de mercado.',
    },
    {
      titulo: 'Startups brasileiras recebem investimentos recordes',
      data_de_envio: '2025-08-07',
      foto: 'https://picsum.photos/400/250?random=4',
      descricao:
        'O ecossistema de inovação no Brasil atraiu bilhões de dólares em aportes no primeiro semestre de 2025.',
    },
    {
      titulo: 'Exploração espacial avança com nova missão lunar',
      data_de_envio: '2025-08-06',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Agência internacional lança foguete rumo à Lua com objetivo de estabelecer base permanente.',
    },
    {
      titulo: 'Exploração espacial avança com nova missão lunar',
      data_de_envio: '2025-08-06',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Agência internacional lança foguete rumo à Lua com objetivo de estabelecer base permanente.',
    },
    {
      titulo: 'Exploração espacial avança com nova missão lunar',
      data_de_envio: '2025-08-06',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Agência internacional lança foguete rumo à Lua com objetivo de estabelecer base permanente.',
    },
    {
      titulo: 'Exploração espacial avança com nova missão lunar',
      data_de_envio: '2025-08-06',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Agência internacional lança foguete rumo à Lua com objetivo de estabelecer base permanente.',
    },
    {
      titulo: 'Exploração espacial avança com nova missão lunar',
      data_de_envio: '2025-08-06',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Agência internacional lança foguete rumo à Lua com objetivo de estabelecer base permanente.',
    },
    {
      titulo: 'Exploração espacial avança com nova missão lunar',
      data_de_envio: '2025-08-06',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Agência internacional lança foguete rumo à Lua com objetivo de estabelecer base permanente.',
    },
    {
      titulo: 'Exploração espacial avança com nova missão lunar',
      data_de_envio: '2025-08-06',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Agência internacional lança foguete rumo à Lua com objetivo de estabelecer base permanente.',
    },
    {
      titulo: 'Exploração espacial avança com nova missão lunar',
      data_de_envio: '2025-08-06',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Agência internacional lança foguete rumo à Lua com objetivo de estabelecer base permanente.',
    },
    {
      titulo: 'Exploração espacial avança com nova missão lunar',
      data_de_envio: '2025-08-06',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Agência internacional lança foguete rumo à Lua com objetivo de estabelecer base permanente.',
    },
    {
      titulo: 'Exploração espacial avança com nova missão lunar',
      data_de_envio: '2025-08-06',
      foto: 'https://picsum.photos/400/250?random=5',
      descricao:
        'Agência internacional lança foguete rumo à Lua com objetivo de estabelecer base permanente.',
    },
  ]

  const handleChangePage = () => {
    router.back()
  }
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
            {noticias.slice(0, 1).map((card) => (
              <div
                key={card.titulo}
                style={{ backgroundImage: `url(${card.foto})`, backgroundSize: 'cover' }}
                className="relative flex p-8 items-start justify-end flex-col h-[500px] w-[90%] overflow-hidden rounded-[5px] bg-slate-950 max-lg:h-[300px] max-lg:w-full"
              >
                 <h1 className='text-2xl z-10 text-white font-semibold'>{card.titulo}</h1>
                 <h1 className='text-base z-10 text-white mt-2'>{card.descricao}</h1>
                 <div className='w-full z-10 flex justify-between'>
                 {// <h1 className='text-sm text-white'>{card.autor}</h1>
                 }
                  <h1 className='text-sm text-white mt-3'>{card.data_de_envio}</h1>

                 </div>
                 <div className='absolute bg-gradient-to-t  bottom-0 left-0 h-full w-full from-slate-950 to-transparent from-10%'></div>
              </div>
            ))}

            {/* container de noticias relevantes  */}
            <div className="flex w-[40%] flex-col gap-5 overflow-x-auto max-lg:mt-4 max-lg:w-full max-lg:flex-row max-lg:gap-3">
              {noticias.slice(0, 5).map((card) => (
                <CardNoticiasRelevantes key={card.titulo} {...card} />
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
                {noticias.map((card) => (
                  <SwiperSlide key={card.titulo}>
                    <div className="w-68 mr-12 flex h-80 items-start justify-center">
                      <CardMaisNoticias key={card.titulo} {...card} />
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
