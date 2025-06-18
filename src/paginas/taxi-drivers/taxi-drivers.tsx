'use client'

import { dataInfoTaxi } from '@/dto/taxi/data-taxi-DTO'
import { CardTaxi } from './components/card-taxi'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { GetAllTaxi } from '@/services/routes/taxi/get-all-taxi'

export const SectionTaxiPage = () => {
  const [showTaxi, setShowTaxi] = useState<dataInfoTaxi[]>([])
  const router = useRouter()

  const handleBackToPage = () => {
    router.back()
  }

  async function fetchTaxi() {
    const response = await GetAllTaxi()
    const taxi = response?.data ?? []
    console.log('valores do taxi', taxi)
    setShowTaxi(taxi)
  }

  useEffect(() => {
    const fetchAll = async () => {
      await fetchTaxi()
    }

    fetchAll()
  }, [])

  return (
    <section className="flex flex-col items-center justify-start">
      {/* Cabeçalho com botão de voltar */}
      <header className="font-poppins flex w-full items-start justify-start bg-[#194A99] px-4 py-6 text-white">
        <div className="mx-auto flex w-full max-w-6xl cursor-pointer items-center gap-2 text-left">
          <h1
            onClick={handleBackToPage}
            className="flex w-auto items-center gap-3 text-2xl font-semibold lg:text-[1rem]"
          >
            <IconArrowLeft />
          </h1>
          <p className="w-auto text-xl font-bold text-white">Área Taxista</p>
        </div>
      </header>

      {/* Grade responsiva de cards */}
      <div className="m-0 grid w-full max-w-[1280px] grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {showTaxi.map((taxista) => (
          <CardTaxi
            key={taxista.phone}
            id={taxista.id}
            name={taxista.name}
            phone={taxista.phone}
            photoURLs={taxista.photoURLs}
            workingDescription={taxista.workingDescription}
          />
        ))}
      </div>
    </section>
  )
}
