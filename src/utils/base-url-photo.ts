import { backgroundloginpage } from "@/assets/image";
import { CardEventPageAdministrative } from "@/dto/event/data-card-event-DTO";

export function BaseUrl (photoURL: string, props: CardEventPageAdministrative){
     const photoUrl =
    props.photos.length > 0
      ? `http://31.97.151.33:4444/${photoURL}`
      : backgroundloginpage

      return photoUrl

}