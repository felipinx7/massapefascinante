'use client'

import { IconPencil } from '@/assets/icons/icon-pencil'
import { IconTrash } from '@/assets/icons/icon-trash'
import { backgroundloginpage } from '@/assets/image'
import { CardNoticiasDTO } from '@/dto/news/DTO-news'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import ModalUpdateNews from './modal/modal-update-news'
import { useEffect, useState } from 'react'
import { DeleteNews } from '@/services/routes/news/delete'

export default function CardNews(data: CardNoticiasDTO) {
  // State utils in component
  const [openModalVisibilityModalUpdate, setOpenModalVisibilityModalUpdate] = useState(false)
  const photo = data.photo?.[0]?.url
    ? baseUrlPhoto('news', data.photo[0].url) || backgroundloginpage
    : backgroundloginpage

  // Function utils in component
  function handleVisibilityModalUpdate() {
    setOpenModalVisibilityModalUpdate((prev) => !prev)
  }

  async function handleDeleteNews() {
    const res = await DeleteNews(data.id)
    
    console.log('Delete da Notícia:', res)
  }

  useEffect(() => {
    console.log('Valor da Foto', data.photo)
  }, [])
  return (
    <article className="flex h-[300px] w-[280px] flex-col justify-between rounded-[0.9rem] shadow-shadowCardEventLocation">
      {/* Container Foto  */}
      <div className="relative mb-1 h-[50%] w-full overflow-hidden rounded-tl-[0.9rem] rounded-tr-[0.9rem]">
        <img
          src={photo ? photo : backgroundloginpage.src}
          className="h-full w-full object-cover"
          alt="Foto da Notícia"
        />

        {/* container de controles */}
        <div className="left-0-0 absolute bottom-0 flex w-full items-center justify-end gap-3 p-2">
          <div
            onClick={handleVisibilityModalUpdate}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[5.97px] bg-white transition-all duration-500 hover:bg-primaryWhite500"
          >
            <IconPencil />
          </div>
          <div onClick={() => handleDeleteNews} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[5.97px] bg-white transition-all duration-500 hover:bg-primaryWhite500">
            <IconTrash />
          </div>
        </div>
      </div>

      {/* container Informações principais  */}
      <div className="flex h-[50%] w-full flex-col items-start gap-2 px-2">
        <h1 className="w-full truncate text-[1.1rem] font-medium text-black">{data.title}</h1>
        <p className="line-clamp-3 h-full w-full break-words text-secundarygray900">
          {data.content}
        </p>
      </div>

      {/* Modais De Controles  */}
      <ModalUpdateNews
        data={data}
        handleVisibilityModalUpdate={handleVisibilityModalUpdate}
        openModalVisibilityModalUpdate={openModalVisibilityModalUpdate}
      />
    </article>
  )
}
