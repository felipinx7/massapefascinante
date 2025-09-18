import { backgroundloginpage } from '@/assets/image'
import { CardPlacesDTO } from '@/dto/places/data-card-placesDTO'
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function BaseUrlPlaces(photoURL: string, props: CardPlacesDTO) {
  const photoUrl =
    props.photos.length > 0 ? `https://api.massapefascinante.com.br/${photoURL}` : backgroundloginpage

  return photoUrl
}
