'use client'

import { LinksButtonPageCliente } from '@/constants/links-button-page-cliente'
import { SideBarCliente } from './components/side-bar'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { logoprefeituramassape } from '@/assets/image'
import { IconCloud } from '@/assets/icons/incon-cloud'
import { useState } from 'react'

export const PageCliente = () => {
  const routes = useRouter()
  const city = 'Massapê'
  const apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c'
  const apiWeath = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${apiKey}&units=metric&lang=pt_br`
  const [temp, setTemp] = useState<string | number>('')
  const [clima, setClima] = useState('')

  async function fetchApi() {
    try {
      const response = await fetch(apiWeath)
      const resultapi = await response.json()
      const temperatura = resultapi.main.temp
      const descricaoClima = resultapi.weather[0].description
      setTemp(temperatura)
      setClima(descricaoClima)
      console.log('Deu bom', resultapi)
      return temp
    } catch (error) {
      console.log('Error ao consumir a api', error)
    }
  }

  fetchApi()

  const handleNavigatePage = (href: string) => {
    routes.push(`https://www.massapefascinante.com.br/${href}`)
  }
  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center justify-between">
      <div className="justify-baseline flex w-full max-w-[1280px] flex-col items-center">
        <SideBarCliente />
        <div className="flex w-full px-4 max-lg:mt-10 max-lg:px-5">
          <div className="justify-baseline flex w-full translate-y-[-1rem] items-center justify-start gap-2 pl-4">
            <div className="h-10 w-10">
              <IconCloud />
            </div>
            <div className="flex flex-col">
              <div className='flex'>
                <p className="font-bold text-primargreen">{Math.round(temp)}C°</p>
                <h1 className="font-bold text-primargreen"> Massapê, CE</h1>
              </div>
              <div>
                <h5 className="text-[0.8rem] text-primargreen">{clima}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTAINER INFO MAIN */}
      <div
        id="home"
        className="flex w-full animate-fadeIn flex-col items-center justify-center px-4 pt-[70px]"
      >
        <h1 className="mx-auto w-full animate-typing-with-cursor overflow-hidden whitespace-nowrap break-words border-r-4 border-white text-center text-[2rem] font-bold text-primargreen max-lg:hidden sm:text-[3rem] md:text-[3.6rem] lg:w-[50%] lg:border-none">
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
                className={`group relative flex h-[154px] w-full animate-slideUp items-center justify-center overflow-hidden rounded-[0.2rem] bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl max-sm:w-full`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={card.photo}
                  alt="Imagem cidade"
                  fill
                  className="rounded object-cover object-bottom transition-opacity duration-500 group-hover:opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-14 flex min-h-[20vh] w-full animate-fadeIn flex-col items-center justify-center gap-3 bg-primarygray p-8 max-lg:min-h-[14vh]">
        <Image
          src={logoprefeituramassape}
          width={400}
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
