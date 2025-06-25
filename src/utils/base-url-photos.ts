export const BASE_URL_BACK_END = 'http://31.97.151.33:4444/uploads/'

export function baseUrlPhoto(type: 'city' | 'event' | 'place' | 'taxiDrivers' | "room", photoName: string) {
  if (!photoName) return null
  return `${BASE_URL_BACK_END}${type}/${photoName}`
}
