import { IconBed } from '@/assets/icons/icon-bed'
import { IconCalendary } from '@/assets/icons/icon-calendary'
import { IconCamera } from '@/assets/icons/icon-camera'
import { IconFork } from '@/assets/icons/icon-fork'
import { IconTaxista } from '@/assets/icons/icon-taxista'
import {
  bannercategoriaatracaoturistica,
  bannercategoriaevento,
  bannercategoriahoteis,
  bannercategoriarestaurant,
  bannercategoriataxistas,

} from '@/assets/image'
import { StaticImageData } from 'next/image'
import React from 'react'

interface LinksButtonPageClienteProps {
  name: string
  Icon: React.ElementType
  href: string
  photo: StaticImageData
}

export const LinksButtonPageCliente: LinksButtonPageClienteProps[] = [
  {
    name: 'Atrações Turísticas',
    Icon: IconCamera,
    href: '/destination',
    photo: bannercategoriaatracaoturistica,
  },
  {
    name: 'Restaurantes',
    Icon: IconFork,
    href: '/restaurant',
    photo: bannercategoriarestaurant,
  },
  {
    name: 'Hospedagens',
    Icon: IconBed,
    href: '/hotel',
    photo: bannercategoriahoteis,
  },
  {
    name: 'Eventos',
    Icon: IconCalendary,
    href: '/events',
    photo: bannercategoriaevento,
  },
  {
    name: 'Taxistas',
    Icon: IconTaxista,
    href: '/taxi',
    photo: bannercategoriataxistas,
  },
  
]
