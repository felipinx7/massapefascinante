'use client'

import { useEffect, useState } from 'react'
import { CardPLaces } from '../components/card-places'
import { CardPlacesDTO } from '@/dto/places/data-card-placesDTO'
import { getAllPlaces } from '@/services/routes/places/get-all-places'
import { useRouter } from 'next/navigation'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'

const ordemDesejada = [
  'SABOR DO SERTÃO',
  "LIRA'S BURGUER",
  'BOTECO DO TORRESMO',
  'RESTAURANTE PRIMEIRA PARADA',
  'RESTAURANTE SABOR DA SERRA',
  'RESTAURANTE BRANCA DE NEVE',
  'RESTAURANTE PONTO DO SUSHI',
  'RESTAURANTE O VALDIZÃO',
  'RESTAURANTE DA BICA',
  'BALNEÁRIO CONTENDAS',
  'RESTAURANTE BANZEIRO',
  'BARRACA DOS IRMÃOS',
  'CARLINHOS DA GALERIA',
  'CLUBE TANGENTE',
  'BALNEÁRIO LILI E MESSIAS',
]

type SubLocation =
  | 'SEDE'
  | 'PÉ_DA_SERRA'
  | 'VÁRZEA_DA_CRUZ'
  | 'MIRIM'
  | 'GREGÓRIO'
  | 'CONTENDAS'
  | 'TANGENTE'

// lista das chaves
const subLocationKeys: SubLocation[] = [
  'SEDE',
  'PÉ_DA_SERRA',
  'VÁRZEA_DA_CRUZ',
  'MIRIM',
  'GREGÓRIO',
  'CONTENDAS',
  'TANGENTE',
]

// labels amigáveis
const subLocationLabels: Record<SubLocation, string> = {
  SEDE: 'Sede',
  PÉ_DA_SERRA: 'Pé da Serra',
  VÁRZEA_DA_CRUZ: 'Várzea da Cruz',
  MIRIM: 'Mirim',
  GREGÓRIO: 'Gregório',
  CONTENDAS: 'Contendas',
  TANGENTE: 'Tangente',
}

function normalizeString(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase()
}

export function SectionRestaurant() {
  const [infoPlaces, setInfoPlaces] = useState<CardPlacesDTO[]>([])
  const routes = useRouter()

  const handleBackToBack = () => {
    routes.back()
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getAllPlaces()

        const restaurantes = response.filter((place) => place.category === 'RESTAURANT')

        const ordenado = restaurantes.sort((a, b) => {
          const nomeA = normalizeString(a.name)
          const nomeB = normalizeString(b.name)

          const indexA = ordemDesejada.findIndex((nome) => normalizeString(nome) === nomeA)
          const indexB = ordemDesejada.findIndex((nome) => normalizeString(nome) === nomeB)

          // Se o nome não está no array, coloca ele no final
          return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB)
        })

        setInfoPlaces(ordenado)
      } catch (error) {
        console.error('Erro ao buscar os restaurantes:', error)
      }
    }

    fetchPlaces()
  }, [])

  return (
    <section id="restaurant" className="flex w-full flex-col items-center gap-5">
      {/* Header com botão de voltar */}
      <div className="fixed z-[999] flex w-full items-center justify-center bg-primargreen p-4">
        <div className="m-0 flex w-[100%] max-w-[1280px] flex-row-reverse items-center justify-end">
          <h2 className="text-xl font-bold text-white">Restaurantes</h2>
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
      <section className="m-0 mt-24 flex w-[100%] max-w-[1280px] flex-col items-start justify-center gap-8 p-4">
        <div className="m-0 flex flex-col items-start justify-start">
          <h1 className="text-[2rem] font-[700] text-primargreen">
            Principais Restaurantes da Cidade
          </h1>
          <p className="text-[1.1rem] font-[400] text-primargreen">
            Conheça os restaurantes destaques na nossa cidade
          </p>
        </div>
        {subLocationKeys.map((subLoc) => {
          const placesInSubLoc = infoPlaces.filter((place) => place.subLocation === subLoc)

          if (placesInSubLoc.length === 0) return null

          return (
            <div key={subLoc} className="w-full">
              <h1 className="mb-4 text-2xl font-bold text-primargreen">
                {subLocationLabels[subLoc]}
              </h1>
              <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {placesInSubLoc.map((place) => (
                  <CardPLaces key={place.id} {...place} />
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </section>
  )
}
