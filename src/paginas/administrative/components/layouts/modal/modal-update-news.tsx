import { IconTrash } from '@/assets/icons/icon-trash'
import { IconClosed } from '@/assets/icons/icone-closed'
import { backgroundloginpage } from '@/assets/image'
import { CardNoticiasDTO } from '@/dto/news/DTO-news'
import { baseUrlPhoto } from '@/utils/base-url-photos'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

interface ModalUpdateNewsProps {
  handleVisibilityModalUpdate: () => void
  openModalVisibilityModalUpdate: boolean
  data: CardNoticiasDTO
}

export default function ModalUpdateNews(props: ModalUpdateNewsProps) {
  // State utils in componente
  const [preview, setPreview] = useState<File | null>(null)
  const [removePhoto, setRemovePhoto] = useState(false)

  const photo = props.data.photoURLs?.[0]?.url
    ? baseUrlPhoto('place', props.data.photoURLs[0].url) || backgroundloginpage
    : backgroundloginpage

  // Function Utils in componente
  function handleChangePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    const ArrayFile = Array.from(event.target.files)
    setPreview(ArrayFile[0])
  }

  function deletePreviewPhoto() {
    setPreview(null)
  }

  function markPhotoForDeleteion() {
    setRemovePhoto(true)
  }

  function handleVisibilityModal(){
    setPreview(null)
    setRemovePhoto(false)
    props.handleVisibilityModalUpdate()
  }

  return ReactDOM.createPortal(
    <section
      className={`fixed inset-0 z-0 flex items-center justify-center bg-black/55 transition-opacity duration-500 ${
        props.openModalVisibilityModalUpdate ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <article
        className={`${props.openModalVisibilityModalUpdate ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} relative z-[20000] flex max-h-[90vh] w-[95%] max-w-lg flex-col gap-4 overflow-y-auto rounded-xl bg-white p-5 px-5 py-4 shadow-lg transition-all duration-500 ease-in-out`}
      >
        {/* container Header  */}
        <div className="z-50 flex w-full items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Atualizar Notícia</h1>
          <div
            className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
            onClick={handleVisibilityModal}
          >
            <IconClosed />
          </div>
        </div>

        {/* container Formulário  */}
        <form className="flex w-full flex-col items-center gap-3">
          {/*Update Foto */}
          <div className="flex w-full flex-col items-start">
            <label htmlFor="foto" className="mb-1 block text-sm font-medium text-gray-700">
              Foto da Noticia
            </label>

            {preview ? (
              //  Visualização da Nova Foto Adicionado
              <div className="relative h-[200px] w-full overflow-hidden">
                {props.data.photoURLs && (
                  <img
                    src={preview ? URL.createObjectURL(preview) : photo}
                    className="h-full w-full rounded-[0.5rem] object-cover"
                    alt=""
                  />
                )}
                <div className="absolute left-0 top-0 h-full w-full p-2">
                  <div className="flex w-full items-end justify-end">
                    <div
                      onClick={preview ? deletePreviewPhoto : markPhotoForDeleteion}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[5.97px] bg-white transition-all duration-500 hover:bg-primaryWhite500"
                    >
                      <IconTrash />
                    </div>
                  </div>
                </div>
              </div>
            ) : !removePhoto && photo ? (
              // renderiza Photo backend 
               <div className="relative h-[200px] w-full overflow-hidden">
                {props.data.photoURLs && (
                  <img
                    src={photo}
                    className="h-full w-full rounded-[0.5rem] object-cover"
                    alt=""
                  />
                )}
                <div className="absolute left-0 top-0 h-full w-full p-2">
                  <div className="flex w-full items-end justify-end">
                    <div
                      onClick={markPhotoForDeleteion}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[5.97px] bg-white transition-all duration-500 hover:bg-primaryWhite500"
                    >
                      <IconTrash />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Adicionar Nova Foto 
              <div className="relative flex h-48 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 text-sm text-gray-500">
                <input
                  type="file"
                  onChange={handleChangePhoto}
                  accept="image*\"
                  className="absolute h-full w-full cursor-pointer opacity-0"
                />
                <p>Escolha a Nova Foto da Notícia</p>
              </div>
            )}
          </div>

          {/* Update Title  */}
          <div className="flex w-full flex-col items-start justify-start">
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="title news">
              Título da Notícia
            </label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-2 text-sm"
              placeholder="Digite o titulo da Noítica"
            />
          </div>

          {/* Update Content  */}
          <div className="flex w-full flex-col">
            <label htmlFor="content author" className="block text-sm font-medium text-gray-700">
              Conteúdo da Notícia
            </label>
            <textarea
              className="h-[100px] w-full resize-none rounded border border-gray-300 p-2 text-sm"
              placeholder="Digite o conteúdo da noticia"
              id=""
            ></textarea>
          </div>

          {/* Update Name Author  */}
          <div className="flex w-full flex-col items-start justify-start">
            <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name author">
              Nome do Autor
            </label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-2 text-sm"
              placeholder="Digite o nome do Author"
            />
          </div>

          {/* button of submited  */}
          <button className="w-full rounded bg-primargreen py-2 text-white">
            Atualizar Notícia
          </button>
        </form>
      </article>
    </section>,

    document.body,
  )
}