import { backgroundfound, peoplenotfound } from '@/assets/image'
import Image from 'next/image'

export default function NotFound() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background fixo preenchendo tudo */}
      <Image
        src={backgroundfound}
        fill
        alt="Background"
        className="absolute object-cover"
        priority
      />

      {/* Conteúdo central */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="text-[3rem] font-bold text-primargreen drop-shadow-lg sm:text-6xl md:text-7xl">
          404
        </h1>
        <p className="mt-2 text-[2rem] text-primargreen drop-shadow-sm sm:text-xl md:text-2xl">
          Página não encontrada
        </p>
        <div className="mt-6 w-full max-w-[320px] flex items-center justify-center">
          <Image src={peoplenotfound} alt="Pessoa perdida" className="h-auto" priority />
        </div>
      </div>
    </section>
  )
}
