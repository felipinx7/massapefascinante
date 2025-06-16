'use client'
import { useRouter } from 'next/navigation'

export const ButtonRegister = () => {
  const router = useRouter()
  

  return (
    <button onClick={() => router.push('/client-page')}  className="hover:shadow-hoverShadowButtomAcessar shadow-shadowButtomAcessar text-primargreen w-[100%] relative rounded-[0.4rem] bg-white p-3 text-[1.4rem] font-[700] duration-[0.5s] ease-in-out">
      ACESSAR AGORA
    </button>
  )
}
