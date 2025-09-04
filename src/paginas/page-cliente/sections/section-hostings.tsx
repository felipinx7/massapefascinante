'use client'

import { getAllPlaces } from '@/services/routes/places/get-all-places'
import { CardPLaces } from '../components/card-places'
import { useEffect, useState } from 'react'
import { CardPlacesDTO } from '@/dto/places/data-card-placesDTO'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'
import { useRouter } from 'next/navigation'

export const SectionHosting = () => {
  const [infoPlaces, setInfoPlaces] = useState<CardPlacesDTO[]>([])
  const routes = useRouter()

  const handleBackToBack = () => {
    routes.back()
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await getAllPlaces()
      setInfoPlaces(response)
    }

    fetchPlaces()
  }, [])

  return (
    <section
      id="destination"
      className="flex w-full flex-col items-center gap-5"
    >
      <div className="absolute z-[999] flex w-full items-center justify-center bg-primargreen p-4">
        <div className="m-0 flex w-[100%] max-w-[1280px] flex-row-reverse items-center justify-end">
          {/* Título */}
          <h2 className="text-xl font-bold text-white">Casas Alugáveis</h2>

          {/* Botão de voltar/fechar */}
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

      <section className='max-w-[1280px] gap-8 p-4 mt-24 w-[100%] m-0 flex items-start justify-center flex-col'>
        <div className="flex items-start flex-col justify-start m-0">
          <h1 className="text-[2rem] font-[700] text-primargreen">
            Conheça as melhores casas que você pode alugar!
          </h1>
          <p className="text-[1.1rem] font-[400] text-primargreen">
         Conheça as casas disponíveis para alugar e aproveite o Chitão de Massapê com muito conforto!


          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(infoPlaces) &&
            infoPlaces
              .filter((place) => place.category === 'HOSTING')
              .map((place) => <CardPLaces key={place.id} {...place} />)}
        </div>
      </section>
    </section>
  )
}
