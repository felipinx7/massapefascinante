'use client'

import { IconArrowLeft } from '@/assets/icons/icon-arrow-left'
import { useRouter } from 'next/navigation'

interface HeaderInfoProps {
  tittle: string
}

export default function HeaderInfo(props: HeaderInfoProps) {
  // State utils in components
  const router = useRouter()

  // Functios utils in components
  const handleBackPage = () => {
    router.back()
  }
  return (
    <header className="flex h-16 px-4 w-full items-center justify-center bg-primargreen">
      <div className="m-0 flex w-full max-w-[1280px] flex-row-reverse items-center justify-end gap-3">
        <h1 className="text-[1.2rem] font-semibold text-white">{props.tittle}</h1>
        <div className='cursor-pointer' onClick={handleBackPage}>
          <IconArrowLeft />
        </div>
      </div>
    </header>
  )
}
