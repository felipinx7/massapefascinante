import { backgroundloginpage } from '@/assets/image'
import { CardPlacesDTO } from '@/dto/places/data-card-placesDTO'

export function BaseUrlPlaces(photoURL: string, props: CardPlacesDTO) {
  const photoUrl =
    props.photos.length > 0 ? `http://31.97.151.33:4444/${photoURL}` : backgroundloginpage

  return photoUrl
}
