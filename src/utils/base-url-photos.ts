export const BASE_URL_BACK_END = 'https://api.massapefascinante.com.br/api/uploads/'

export function baseUrlPhoto(type: 'city' | 'event' | 'place' | 'taxiDrivers' | "room", photoName: string) {
  if (!photoName) return null
  return `${BASE_URL_BACK_END}${type}/${photoName}`
}
