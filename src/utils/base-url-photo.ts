import { backgroundloginpage } from "@/assets/image";
import { CardEventPageAdministrative } from "@/dto/event/data-card-event-DTO";

export function BaseUrl (photoURL: string, props: CardEventPageAdministrative){
     const photoUrl =
    props.photos.length > 0
      ? `https://api.massapefascinante.com.br/api/${photoURL}`
      : backgroundloginpage

      return photoUrl

}