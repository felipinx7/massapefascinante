'use client'

import { LinksButtonPageCliente } from '@/constants/links-button-page-cliente'
import { SideBarCliente } from './components/side-bar'
import Image from 'next/image'
import { imagecitymassape, imageLogo } from '@/assets/image'
import { useRouter } from 'next/navigation'

export const PageCliente = () => {
  const routes = useRouter()

  const handleNavigatePage = (href: string) => {
    routes.push(`https://www.massapefascinante.com.br/${href}`)
  }
  return (
    <main className="flex min-h-[100vh] w-full flex-col justify-between">
      <SideBarCliente />

      {/* CONTAINER INFO MAIN */}
      <div
        id="home"
        className="flex w-full animate-fadeIn flex-col items-center justify-center px-4 pt-[70px]"
      >
        <h1 className="mx-auto w-full animate-typing-with-cursor overflow-hidden whitespace-nowrap break-words border-r-4 border-white text-center text-[2rem] font-bold text-primargreen max-lg:hidden sm:text-[3rem] md:text-[3.6rem] lg:w-[50%] lg:border-none">
          Conheça melhor a cidade de Massapê
        </h1>

        <h1 className="mb-5 hidden w-full text-center text-[2.5rem] font-bold leading-[70px] text-primargreen max-lg:block">
          Conheça melhor a cidade de Massapê
        </h1>

        <p className="w-full text-center text-[1.1rem] font-[400] text-primargreen transition-opacity duration-700 ease-in hover:opacity-80">
          Veja abaixo as categorias que vão guiar sua próxima descoberta.
        </p>

        {/* CATEGORIAS DESKTOP */}
        <div className="flex w-full max-w-[1280px] items-center justify-center max-md:hidden">
          <div className="flex items-center justify-end gap-3 py-7 max-lg:w-full max-lg:flex-col">
            {LinksButtonPageCliente.map((card, index) => (
              <button
                key={index}
                onClick={() => handleNavigatePage(card.href)}
                className="hover:bg-primargreen/90 flex w-auto items-center justify-center gap-3 rounded-full bg-primargreen p-3 text-center text-[1.1rem] font-[600] text-white transition-transform duration-300 hover:scale-105 max-lg:w-full"
              >
                <a
                  href={card.href}
                  className="flex w-auto items-center justify-center gap-4 text-center"
                >
                  <card.Icon />
                  {card.name}
                </a>
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORIAS MOBILE */}
        <div className="hidden w-full max-w-[1280px] items-center justify-center py-4 max-md:block">
          <div className="grid grid-cols-2 place-items-center gap-3 max-sm:w-full">
            {LinksButtonPageCliente.map((card, index) => (
              <div
                key={index}
                onClick={() => handleNavigatePage(card.href)}
                className={`animate-slideUp group relative flex h-[154px] w-full items-center justify-center overflow-hidden rounded-[0.2rem] bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl max-sm:w-full`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={imagecitymassape}
                  alt="Imagem cidade"
                  fill
                  className="rounded object-cover transition-opacity duration-500 group-hover:opacity-80"
                />
                <a
                  href={card.href}
                  className="animate-slideUp bg-primargreen/80 absolute flex items-center gap-4 rounded-full px-4 py-2 text-[1.2rem] font-[600] text-white transition-all duration-300 max-md:flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {card.name}
                  <card.Icon />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-14 flex min-h-[20vh] w-full animate-fadeIn flex-col items-center justify-center gap-3 bg-primarygray p-8 max-lg:min-h-[14vh]">
        <Image
          src={imageLogo}
          width={200}
          alt="Image Logo"
          className="transition-transform duration-300 hover:scale-105"
        />
        <p className="font-poppins text-center text-sm font-[400] text-primargreen transition-opacity">
          Copyright © 2025 Massape Fascinante. All Rights Reserved.
        </p>
      </footer>
    </main>
  )
}
