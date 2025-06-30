'use client'

import { useEffect, useState } from 'react'
import { CardPLaces } from '../components/card-places'
import { CardPlacesDTO } from '@/dto/places/data-card-placesDTO'
import { getAllPlaces } from '@/services/routes/places/get-all-places'
import { useRouter } from 'next/navigation'
import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'

// Ordem "ideal" de exibição (você pode ajustar aqui conforme os nomes no banco)
const ordemDesejada = [
  'SABOR DO SERTÃO',
  "LIRA'S BURGUER",
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

// 🔧 Função que normaliza strings para comparação
function normalizeString(str: string) {
  return str
    .normalize('NFD') // remove acentos
    .replace(/[\u0300-\u036f]/g, '') // remove marcas de acento
    .replace(/[^\w\s]/gi, '') // remove pontuação
    .replace(/\s+/g, ' ') // espaços múltiplos viram 1
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

        const restaurantes = response.filter(
          (place) => place.category === 'RESTAURANT'
        )

        const ordenado = restaurantes.sort((a, b) => {
          const nomeA = normalizeString(a.name)
          const nomeB = normalizeString(b.name)

          const indexA = ordemDesejada.findIndex(
            (nome) => normalizeString(nome) === nomeA
          )
          const indexB = ordemDesejada.findIndex(
            (nome) => normalizeString(nome) === nomeB
          )

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
      <div className="absolute flex w-full items-center justify-center bg-primargreen p-4">
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
      <section className="m-0 mt-24 flex w-[100%] gap-8 max-w-[1280px] flex-col items-start justify-center p-4">
        <div className="m-0 flex flex-col items-start justify-start">
          <h1 className="text-[2rem] font-[700] text-primargreen">
            Principais Restaurantes da Cidade
          </h1>
          <p className="text-[1.1rem] font-[400] text-primargreen">
            Conheça os restaurantes destaques na nossa cidade
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(infoPlaces) &&
            infoPlaces.map((place) => <CardPLaces key={place.id} {...place} />)}
        </div>
      </section>
    </section>
  )
}
