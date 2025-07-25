'use client'

import { backgroundloginpage } from '@/assets/image'
import { IconInstagram } from '@/assets/icons/icon-instagram'
import { IconWhatsapp } from '@/assets/icons/icone-whatsapp'
import { FC, useEffect, useState } from 'react'
import { dataCardEventClientPage } from '@/dto/event/data-card-event-client-page-DTO'
import { CardEventPageAdministrative } from '@/dto/event/data-card-event-DTO'
import { getAllPlaces } from '@/services/routes/places/get-all-places'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'
import { CardPLaces } from './card-places'

import Image from 'next/image'
import { Pagination } from 'swiper/modules'


import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


interface ModalLocationProps extends CardEventPageAdministrative {
  onClose: () => void
  showModal: boolean
}

// ✅ Função que gera o link do WhatsApp com o número limpo e formatado corretamente
function gerarLinkWhatsApp(numero: string): string {
  const numeroLimpo = numero.replace(/\D/g, '') // Remove tudo que não for número
  const comCodigo = numeroLimpo.startsWith('55') ? numeroLimpo : `55${numeroLimpo}` // Adiciona código do Brasil se não tiver
  return `https://wa.me/${comCodigo}`
}

export const ModalLocation: FC<ModalLocationProps> = ({
  name,
  roomValue,
  description,
  location,
  instagram,
  phone,
  photos,
  onClose,
  showModal,
}) => {
  const [placesSimilar, setPlacesSimilar] = useState<dataCardEventClientPage[]>([])

  useEffect(() => {
    if (showModal) {
      const fetchPlacesSimilar = async () => {
        const response = await getAllPlaces()
        setPlacesSimilar(response)
      }

      fetchPlacesSimilar()
    }
  }, [showModal])

  if (!showModal) return null

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`

  const photosUrls = photos.map(photo => baseUrlPhoto('place', photo.url))

  const whatsappLink = gerarLinkWhatsApp(phone)

  return (
    <section className="fixed inset-0 z-[999] h-screen w-full overflow-y-auto bg-white">
      <div className="flex items-center justify-center bg-primargreen px-4 py-3">
        <div className="m-0 flex w-[100%] max-w-[1280px] flex-row-reverse items-center justify-end">
          {/* Título */}
          <h2 className="text-xl font-bold text-white">{name}</h2>

          {/* Botão de voltar/fechar */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold text-white"
            aria-label="Voltar"
          >
            <span>
              <IconArrowLeft />
            </span>
          </button>
        </div>
      </div>

      <div className="m-auto w-full max-w-[1280px] px-4 py-8">
        {/* Imagem do local */}
        <div
          className="max-h-[500px] w-full overflow-hidden rounded-xl"
          style={{ height: '500px' }}
        >
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}

            slidesPerView={1}
            className="rounded-xl"
          >
            {photosUrls.map((photo, index) => (
              <SwiperSlide key={index}>
                <div className="h-[500px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={photo}
                    alt={`Foto ${index + 1} de Moraújo`}
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
          <h1 className="text-[2rem] font-bold">{name}</h1>
          {roomValue ? (<h1 className="text-[2rem] font-bold">R$ {roomValue != 1 ? roomValue : " "  }</h1>) : ""}

          <p className="mt-4 text-[1rem] leading-6 text-gray-700">{description}</p>
        </div>

        {/* Contact */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">Contatos</h2>
          <div className="flex  gap-4">
            {instagram && (
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-black px-6 py-2 hover:bg-gray-100"
              >
                <IconInstagram />
                <p className="max-sm:hidden">Instagram</p>
              </a>
            )}
            {phone && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-black px-6 py-2 hover:bg-gray-100"
              >
                <IconWhatsapp />
                <p className="max-sm:hidden">Whatsapp</p>
              </a>
            )}
          </div>
        </div>
        {/* Localização - Google Maps */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">Localização</h2>
          <div className="h-[300px] w-full overflow-hidden rounded-xl">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de ${name}`}
            ></iframe>
          </div>
        </div>
        {/* Indicações de lugares semelhantes */}
        <div className="mt-10">
          <h2 className="mb-6 text-lg font-bold">Indicações de Lugares Semelhantes</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {placesSimilar.map((place, index) => {
              const photo = baseUrlPhoto('place', place?.photos[0].url)
              return (
              <div key={index} className="flex flex-col">
                    <div key={index} className="h-[250px] w-full overflow-hidden rounded-lg">
                      <img
                        src={photo || backgroundloginpage}
                        alt={`Imagem de ${place.name}`}
                        className="h-full w-full object-cover"
                        width={400}
                        height={250}
                      />
                    </div>
                <span className="mt-2 font-semibold">{place.name}</span>
                <span className="text-sm text-gray-600">{place.location}</span>
              </div>
            )})}
          </div>
        </div>
      </div>
    </section>
  )
}
