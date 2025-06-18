'use client'

import { useEffect, useState } from 'react'
import { getAllEvents } from '@/services/routes/events/get-all-events'
import { dataCardEventClientPage } from '@/dto/event/data-card-event-client-page-DTO'
import { CardEvent } from '../components/card-event'
import { useRouter } from 'next/navigation'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'

export const SectionEvents = () => {
  const [infoEvents, setInfoEvents] = useState<dataCardEventClientPage[] | null>(null)

  const routes = useRouter()

  const handleBackToBack = () => {
    routes.back()
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents()

        const eventsArray: dataCardEventClientPage[] = response
          ? Object.values(response).map((event) => {
              const typedEvent = event as {
                id: string
                name: string
                date: Date
                lastDate: Date
                location: string
                description: string
                active: boolean
                photos: { url: string }[]
                instagram?: string
              }

              return {
                id: typedEvent.id,
                name: typedEvent.name,
                date: new Date(typedEvent.date),
                lastDate: new Date(typedEvent.lastDate),
                location: typedEvent.location,
                description: typedEvent.description,
                active: typedEvent.active,
                photoURLs: typedEvent.photos[0]?.url || '',
                instagram: typedEvent.instagram || '',
              }
            })
          : []

        setInfoEvents(eventsArray)
        console.log('Eventos recebidos da API:', eventsArray)
      } catch (error) {
        console.error('Erro ao buscar eventos:', error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <section id="events" className="relative flex w-full flex-col items-center gap-5">
      {/* Cabeçalho fixo */}
      <div className="absolute left-0 top-0 z-10 flex w-full items-center justify-center bg-primargreen p-4 shadow-md">
        <div className="flex w-full max-w-[1280px] flex-row-reverse items-center justify-end gap-4">
          <h2 className="text-xl font-bold text-white">Eventos</h2>
          <button
            onClick={handleBackToBack}
            className="hover:bg-primargreen/80 flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold text-white transition"
            aria-label="Voltar"
          >
            <IconArrowLeft />
          </button>
        </div>
      </div>

      {/* Conteúdo com padding-top para não ficar atrás do cabeçalho */}
      <section className="mt-24 flex w-full max-w-[1280px] flex-col items-start justify-start p-4">
        <div className="mb-6 flex w-full flex-col items-start justify-start">
          <h1 className="text-[2rem] font-[700] text-primargreen">
            Conheça os melhores eventos da cidade
          </h1>
          <p className="text-[1.1rem] font-[400] text-primargreen">
            Participe da cultura da cidade participando dos melhores eventos
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {infoEvents?.map((card) => <CardEvent key={card.id} {...card} />)}
        </div>
      </section>
    </section>
  )
}
