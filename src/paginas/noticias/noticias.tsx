'use client'

import { baseUrlPhoto } from '@/utils/base-url-photos'

import { IconeSetaVoltando } from '@/assets/icons/icone-de-seta-voltando'
import { useRouter } from 'next/navigation'
import CardNoticiasRelevantes from './components/card-noticias-relevantes'
import { CardNoticiasDTO } from '@/dto/news/DTO-news'
import { Footer } from '../home-page/sections/footer'
import CardMaisNoticias from './components/card-mais-noticias'
import { GetAllNews } from '@/services/routes/news/getAll'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

import '../../config/globals.css'
import { useEffect, useState } from 'react'

export default function PaginaNoticia() {
  //Estados
  const [news, setNews] = useState<CardNoticiasDTO[]>([
  {
    id: "1",
    author: "Redação Massapê News",
    title: "Prefeitura inaugura nova praça no centro da cidade",
    content:
      "A população agora conta com um novo espaço de lazer, com playground, academia ao ar livre e áreas de convivência.",
    photo: [{ id: "101", url: "https://picsum.photos/id/1015/800/600" }],
    date: "2025-08-10",
  },
  {
    id: "2",
    author: "Maria Silva",
    title: "Escola municipal recebe prêmio de melhor desempenho do Ceará",
    content:
      "A Escola José de Alencar foi premiada pelo Governo do Estado após alcançar destaque no IDEB.",
    photo: [{ id: "102", url: "https://picsum.photos/id/1011/800/600" }],
    date: "2025-08-09",
  },
  {
    id: "3",
    author: "João Lima",
    title: "Feira de Agricultura Familiar movimenta economia local",
    content:
      "Produtores rurais de Massapê celebraram vendas recordes na 5ª edição da feira, que reuniu mais de 2 mil visitantes.",
    photo: [{ id: "103", url: "https://picsum.photos/id/1021/800/600" }],
    date: "2025-08-08",
  },
  {
    id: "4",
    author: "Secretaria de Educação",
    title: "Massapê recebe nova frota de ônibus escolares",
    content:
      "Os novos veículos vão beneficiar mais de 1.200 estudantes da rede pública municipal.",
    photo: [{ id: "104", url: "https://picsum.photos/id/1043/800/600" }],
    date: "2025-08-07",
  },
  {
    id: "5",
    author: "Cultura Massapê",
    title: "Festival Cultural reúne artistas locais",
    content:
      "O evento contou com apresentações musicais, teatrais e exposições de artesanato da região.",
    photo: [{ id: "105", url: "https://picsum.photos/id/1059/800/600" }],
    date: "2025-08-05",
  },
  {
    id: "6",
    author: "Prefeitura Municipal",
    title: "Obras de pavimentação chegam a 80% de conclusão",
    content:
      "Diversas ruas do município estão recebendo novo calçamento e drenagem para melhorar a mobilidade urbana.",
    photo: [{ id: "106", url: "https://picsum.photos/id/1067/800/600" }],
    date: "2025-08-03",
  },
  {
    id: "7",
    author: "Secretaria de Saúde",
    title: "Campanha de vacinação supera expectativas",
    content:
      "Mais de 10 mil doses foram aplicadas contra a gripe e o sarampo em menos de um mês.",
    photo: [{ id: "107", url: "https://picsum.photos/id/1074/800/600" }],
    date: "2025-08-01",
  },
  {
    id: "8",
    author: "Agro Notícias",
    title: "Massapê se destaca na produção de caju",
    content:
      "Agricultores locais registraram aumento de 20% na colheita deste ano, impulsionando a economia rural.",
    photo: [{ id: "108", url: "https://picsum.photos/id/1084/800/600" }],
    date: "2025-07-29",
  },
  {
    id: "9",
    author: "Redação Massapê News",
    title: "Nova biblioteca comunitária é inaugurada",
    content:
      "Com mais de 5 mil livros, o espaço promete incentivar a leitura entre crianças e jovens do município.",
    photo: [{ id: "109", url: "https://picsum.photos/id/109/800/600" }],
    date: "2025-07-27",
  },
  {
    id: "10",
    author: "Departamento de Tecnologia",
    title: "Massapê avança em tecnologia com internet gratuita em praças",
    content:
      "A população já pode acessar Wi-Fi gratuito em 3 praças principais da cidade.",
    photo: [{ id: "110", url: "https://picsum.photos/id/110/800/600" }],
    date: "2025-07-25",
  },
])
  const router = useRouter()

  //Funções
  useEffect(() => {
    async function FetchNews() {
      const res = await GetAllNews()
      console.log('Resposta da API', res.response)

      setNews(res.response)
    }
    FetchNews()
  }, [])

  const handleChangePage = () => {
    router.back()
  }

  useEffect(() => {
    console.log('Noticias', news)
  }, [news])


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
            {news?.slice(0, 1).map((card) => (
              <div
              onClick={() => router.push(`/noticias/${card.id}`)}
                key={card.title}
                style={{ backgroundImage: `url(${baseUrlPhoto("news" , card.photo[0].url)})`, backgroundSize: 'cover' }}
                className="relative flex cursor-pointer mt-1  h-[500px]  w-[90%] flex-col items-start justify-end overflow-hidden rounded-[5px] bg-slate-950 p-8 max-lg:w-full"
              >
                <h1 className="z-10 text-2xl max-md:text-xl font-semibold text-white">{card.title}</h1>
                <h1 className="z-10 mt-2 max-md:text-sm text-base text-white line-clamp-2">{card.content}</h1>
                <div className="z-10 mt-3 flex w-full justify-between">
                  <h1 className="text-xs text-white">{card.author}</h1>
                </div>
                <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-slate-950 from-10% to-transparent"></div>
              </div>
            ))}

            {/* container de noticias relevantes  */}
            <div className="flex w-[428px] max-lg:overflow-y-hidden max-lg:w-full max-lg:gap-1 max-lg:h-80 overflow-y-hidden max-lg:justify-between max-md:overflow-scroll p-1 overflow-x-hidden justify-between max-lg:justify-start flex-col gap-5 max-lg:mt-4  max-lg:flex-row ">
              {news?.slice(1, 5).map((card) => (
                <div
                  className="flex"
                  key={card.title}
                  onClick={() => router.push(`/noticias/${card.id}`)}
                >
                  <CardNoticiasRelevantes key={card.title} {...card} />
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
                    slidesPerView: 2,
                  },
                  420: {
                    slidesPerView: 1.5,
                  },
                  624: {
                    slidesPerView: 2.3,
                  },
                  768: {
                    slidesPerView: 3.1,
                  },
                  1024: {
                    slidesPerView: 4.2,
                  },
                  1280: {
                    slidesPerView: 4.8,
                  },
                }}
                className="gap-8 rounded-xl px-8 py-8"
              >
                {news?.slice(5).map((card) => (
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
