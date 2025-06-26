'use client'

import { useEffect, useState } from 'react'
import { CardPLaces } from '../components/card-places'
import { CardPlacesDTO } from '@/dto/places/data-card-placesDTO'
import { getAllPlaces } from '@/services/routes/places/get-all-places'
import { useRouter } from 'next/navigation'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'

export function SectionHotel() {
  const [infoPlaces, setInfoPlaces] = useState<CardPlacesDTO[]>([])
  const routes = useRouter()

  const handleBackToBack = () => {
    routes.back()
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getAllPlaces()
        setInfoPlaces(response)
      } catch (error) {
        console.error('Erro ao buscar hotéis:', error)
      }
    }

    fetchPlaces()
  }, [])

  return (
    <section id="hotel" className="flex w-full flex-col items-center gap-5">
      {/* Cabeçalho fixo */}
      <div className="absolute flex w-full items-center justify-center bg-primargreen p-4">
        <div className="m-0 flex w-[100%] max-w-[1280px] flex-row-reverse items-center justify-end">
          <h2 className="text-xl font-bold text-white">Hospedagens</h2>
          <button
            onClick={handleBackToBack}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold text-white"
            aria-label="Voltar"
          >
            <span>
              <IconArrowLeft />
            </span>
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <section className="m-0 gap-8 mt-24 flex w-[100%] max-w-[1280px] flex-col items-start justify-center p-4">
        <div className="m-0 flex flex-col items-start justify-start">
          <h1 className="text-[2rem] font-[700] text-primargreen">
            Conheça os Principais Hotéis e Pousadas
          </h1>
          <p className="text-[1.1rem] font-[400] text-primargreen">
            Descubra os locais favoritos para quem busca conforto e boas experiências.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {infoPlaces
            .filter((place) => place.category === 'HOTEL' )
            .map((place) => (
              <CardPLaces key={place.id} {...place} />
            ))}
        </div>
      </section>
    </section>
  )
}
