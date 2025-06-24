import { IconBed } from '@/assets/icons/icon-bed'
import { IconCalendary } from '@/assets/icons/icon-calendary'
import { IconCamera } from '@/assets/icons/icon-camera'
import { IconFork } from '@/assets/icons/icon-fork'
import { IconMontain } from '@/assets/icons/icon-montain'
import { IconTaxista } from '@/assets/icons/icon-taxista'
import { bannercategoriaatracaoturistica, bannercategoriaevento, bannercategoriahoteis, bannercategoriarestaurant, imagecitymassape } from '@/assets/image'
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
    name: 'Destinos',
    Icon: IconMontain,
    href: '/destination',
    photo: imagecitymassape
  },
  {
    name: 'Restaurantes',
    Icon: IconFork,
    href: '/restaurant',
    photo: bannercategoriarestaurant
  },
  {
    name: 'Hospedagens',
    Icon: IconBed,
    href: '/hotel',
    photo: bannercategoriahoteis
  },
  {
    name: 'Atração Turisticas',
    Icon: IconCamera,
    href: '/destination',
    photo: bannercategoriaatracaoturistica
  },
  {
    name: 'Eventos',
    Icon: IconCalendary,
    href: '/events',
    photo: bannercategoriaevento
  },
  {
    name: 'Taxistas',
    Icon: IconTaxista,
    href: '/taxi',
    photo: imagecitymassape
  },
]
