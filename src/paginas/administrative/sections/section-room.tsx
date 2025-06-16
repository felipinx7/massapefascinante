'use client'

import { useEffect, useState } from 'react'
import { NameAdminstrative } from '../components/layouts/header-info-adm'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { roomSchema } from '@/schemas/room-schema'
import { IconClosed } from '@/assets/icons/icone-closed'
import { getInfoCity } from '@/services/routes/city/get-info-city'
import { DeleteRoom } from '@/services/routes/rooms/delete-room'

import { getAllPlaces } from '@/services/routes/places/get-all-places'

import { HostingCardData, roomDTO } from '@/dto/places/roomData'
import { roomData } from '@/dto/places/roomData'
import { formatPhoneNumber } from '@/utils/formatPhone'

import { DeleteHosting } from '@/services/routes/places/hosting/delete-hosting'

import { dataHostingSchema } from '@/schemas/places-schema'
import { HostingDTO } from '@/dto/places/data-places-DTO'
import { createHostingWithRoom } from '@/services/routes/places/hosting/create-hosting'
import { CardHost } from '../components/layouts/card-host'

export const SectionRoom = () => {
  const [isVisibility, setIsVisibility] = useState(false)
  const [valuePhone, setValuePhone] = useState('')

  const [showRooms, setShowRooms] = useState<HostingCardData[] | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [filteredRooms, setFilteredRooms] = useState<HostingCardData[] | null>(null)
  const [cityID, setCityID] = useState<string>('')

  const handleVisibility = () => {
    setIsVisibility((prev) => !prev)
  }

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof dataHostingSchema>>({
    resolver: zodResolver(dataHostingSchema),
  })

  async function onSubmit(data: HostingDTO) {
    console.log('foi')
    const response = await createHostingWithRoom(data, cityID)
    console.log('Resposta da API:', response)
    reset()
    setIsVisibility(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValuePhone(formatted)
  }
  useEffect(() => {
    const fetchInfoCity = async () => {
      const city = await getInfoCity()
      const places = await getAllPlaces()

      const hostingPlaces = places
        .filter((place: any) => place.category === 'HOSTING')
        .map((place: any) => ({
          ...place,
          // garantir que room seja só o primeiro item do array rooms
          room:
            Array.isArray(place.rooms) && place.rooms.length > 0
              ? place.rooms[0]
              : {
                  id: '',
                  price: 0,
                  available: false,
                },
        }))

      console.log('hostings :', hostingPlaces)

      setShowRooms(hostingPlaces)
      setCityID(city.id)
    }

    fetchInfoCity()
  }, [])

  const handleFilter = () => {
    if (!searchValue.trim()) {
      setFilteredRooms(null)
      return
    }

    const filtered = showRooms?.filter((room) =>
      room.description.toLowerCase().includes(searchValue.toLowerCase()),
    )

    setFilteredRooms(filtered ?? [])
  }

  const FunctiondeleteHost = async (id: string) => {
    await DeleteHosting(id)
    console.log('Hosting Excluido com sucesso!')

    setShowRooms((prev) => prev?.filter((room) => room.id !== id) ?? null)
    setFilteredRooms((prev) => prev?.filter((room) => room.id !== id) ?? null)
  }

  return (
    <section className="w-[cacl(100%-20%)]">
      <div className="max-lg:hidden">
        <NameAdminstrative SibeBarMobile={false} />
      </div>

      {/* Inpurt for Search */}
      <div className="relative w-[80%] max-lg:w-full">
        <input
          type="text"
          placeholder="Pesquise pelo quarto"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-[100%] rounded-[1rem] bg-primarygray p-5 outline-none focus:border-[2px] focus:border-primargreen"
        />
        <button
          onClick={handleFilter}
          className="absolute right-2 top-1.5 w-auto rounded-[1rem] bg-primargreen p-3.5 font-[700] text-white"
        >
          Buscar
        </button>
      </div>

      {/* Botton of add location */}
      <button
        onClick={handleVisibility}
        className="mt-4 rounded bg-primargreen p-3 font-bold text-white"
      >
        Adicionar um quarto
      </button>

      {/* Modal */}
      <div
        className={`${
          isVisibility ? 'fixed' : 'hidden'
        } inset-0 z-50 flex items-center justify-center bg-black/50`}
      >
        <article className="relative max-h-[90vh] w-[95%] max-w-lg overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Nova Hospedagem</h2>
              <button
                onClick={handleVisibility}
                type="button"
                className="h-[30px] w-[30px] text-gray-600 hover:text-gray-800"
              >
                <IconClosed />
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Upload Photos</label>
              <div className="relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">
                <Controller
                  name="photoURLs"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        onChange={(e) => {
                          const files = e.target.files
                          field.onChange(files ? Array.from(files) : [])
                        }}
                      />
                      <span>Click to upload images</span>
                    </>
                  )}
                />
              </div>
              {errors.photoURLs && (
                <p className="text-sm text-red-500">{errors.photoURLs.message}</p>
              )}
            </div>

            {/* Campos de nome e telefone */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Example: Beach Restaurant"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                <input
                  {...register('phone')}
                  type="text"
                  value={valuePhone}
                  maxLength={15}
                  onChange={(e) => handleChange(e)}
                  placeholder="(99) 99999-9999"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Campos Instagram e local */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  {...register('instagram')}
                  type="text"
                  placeholder="@placehandle"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.instagram && (
                  <p className="text-sm text-red-500">{errors.instagram.message}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                <input
                  {...register('location')}
                  type="text"
                  placeholder="Street, Neighborhood"
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                />
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                placeholder="Tell more about this place..."
                rows={3}
                className="w-full resize-none rounded border border-gray-300 p-2 text-sm"
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Upload de fotos */}


            {/* Campos de nome e telefone */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">Valor</label>
                <h1 className="absolute bottom-2 left-2">R$</h1>
                <input
                  {...register('room.price', { valueAsNumber: true })}
                  type="number"
                  placeholder="300,00"
                  className="w-full rounded border border-gray-300 p-2 pl-8 text-sm"
                />
              </div>
            </div>

            {/* Campos Instagram e local */}
            <div className="flex gap-2"></div>

            {/* Descrição */}


            {/* Botão de envio */}
            <div>
              <button
                type="submit"
                className="w-full rounded bg-primargreen px-4 py-2 font-semibold text-white transition hover:bg-green-600"
              >
                Registrar quarto
              </button>
            </div>
          </form>
        </article>
      </div>

      {/* Filtered cards or all */}
      <div className="mt-4 grid min-h-[80vh] w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-10 overflow-y-auto">
        {(filteredRooms ?? showRooms)?.length ? (
          (filteredRooms ?? showRooms)?.map((room, index) => <CardHost key={index} {...room} handleDeletePlace={FunctiondeleteHost} />)
        ) : (
          <p className="col-span-full text-center">Nenhum quarto encontrado.</p>
        )}
      </div>
    </section>
  )
}
