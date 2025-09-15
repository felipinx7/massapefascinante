export const BASE_URL_BACK_END = 'https://api.massapefascinante.com.br/uploads/'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function baseUrlPhoto(
  type: 'city' | 'event' | 'place' | 'taxiDrivers' | 'room' | 'news',
  photoName: string | undefined | null,
) {
  if (!photoName) return undefined

  // Se já for uma URL (começa com http), apenas retorna como está
  if (photoName.startsWith('http')) return photoName

  return `${API_URL}/${type}/${photoName}`
}
