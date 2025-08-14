'use client'

import { IconInstagram } from '@/assets/icons/icon-instagram'
import Image from 'next/image'
import { imagem01, imagem02, imagem03, imagem04 } from '@/assets/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { IconWhatsapp } from '@/assets/icons/icone-whatsapp'
import { useRouter } from 'next/navigation'

export const HistoryCity = () => {
  const router = useRouter()

  const handleBackPage = () => {
    router.back()
  }
  return (
    <section className="fixed inset-0 z-[999] h-screen w-full overflow-y-auto">
      <div className="flex items-center justify-center bg-primargreen px-4 py-3">
        <div className="m-0 flex w-[100%] max-w-[1280px] flex-row-reverse items-center justify-end">
          {/* Título */}
          <h2 className="text-xl font-bold text-white">História de Massapê</h2>

          {/* Botão de voltar/fechar */}
          <button
            onClick={handleBackPage}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold text-white"
            aria-label="Voltar"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="m-auto w-full max-w-[1280px] px-4 py-8">
        {/* Swiper com imagens da cidade */}
        <div className="w-full items-center justify-center text-center font-[600] text-primargreen">
          <p>Role as imagens para visualizar mais sobre</p>
        </div>
        <div className="mt-3">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            className="rounded-xl"
          >
            {[imagem01, imagem02, imagem03, imagem04].map((photo, index) => (
              <SwiperSlide key={index}>
                <div className="h-[500px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={photo}
                    alt={`Foto ${index + 1} de Massapê`}
                    width={1200}
                    height={500}
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Título e descrição */}
        <div className="mt-6">
          <h1 className="text-[2rem] font-bold text-blue-900">Massapê - CE</h1>O município de
          Massapê, localizado no estado do Ceará, possui uma história marcada por transformações
          sociais e econômicas que moldaram sua identidade ao longo do tempo. Até 1899, era
          conhecido como Vila da Serra Verde, denominação relacionada à sua localização próxima à
          Serra da Meruoca. A região foi originalmente habitada por povos indígenas, entre eles os
          Anacés, Tacari-Arariu e Tabajara, que viviam de forma integrada aos recursos naturais
          disponíveis. O processo de povoamento ganhou força a partir de dois eventos centrais. O
          primeiro foi o retorno dos chamados “Paroaras”, cearenses que haviam migrado para a região
          amazônica durante a grande seca de 1877, buscando trabalho no primeiro Ciclo da Borracha.
          Muitos retornaram à terra natal com recursos financeiros, investindo em atividades
          agrícolas e comerciais, o que impulsionou o desenvolvimento local. O segundo fator
          decisivo foi a construção da Estrada de Ferro Sobral–Camocim e a inauguração da Estação
          Ferroviária de Massapê em 31 de dezembro de 1881, que facilitaram o transporte de pessoas
          e mercadorias, integrando o município à economia regional. Com o passar dos anos, Massapê
          se expandiu administrativamente e hoje é composto por seis distritos: Aiuá, Ipaguaçu
          (antigo Acaraú-Mirim), Mumbaba, Padre Linhares (antigo povoado de São Luiz, elevado a
          distrito pela Lei nº 1.153, de 22 d
        </div>

        {/* Localização - Mapa */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">Localização</h2>
          <div className="h-[300px] w-full overflow-hidden rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.144183992605!2d-40.34304612414647!3d-3.5233585432383835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x794fa94386b3f77%3A0x26e768e2895606ef!2sMassap%C3%AA%2C%20CE%2C%2062100-000!5e0!3m2!1spt-BR!2sbr!4v1717851921926!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Massapê"
            ></iframe>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">Redes Sociais</h2>
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-4">
              <a
                href="https://instagram.com/prefeituramassape"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-black px-6 py-2 transition hover:bg-gray-100"
              >
                <IconInstagram />
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/seunumero"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-black px-6 py-2 transition hover:bg-gray-100"
              >
                <IconWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
