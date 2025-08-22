export const BASE_URL_BACK_END = 'http://localhost:4444/uploads/'

export function baseUrlPhoto(
  type: 'city' | 'event' | 'place' | 'taxiDrivers' | 'room' | 'news',
  photoName: string,
) {
  if (!photoName) return null

  // Se já for uma URL (começa com http), apenas retorna como está
  if (photoName.startsWith('http')) return photoName

  return `${BASE_URL_BACK_END}${type}/${photoName}`
}
