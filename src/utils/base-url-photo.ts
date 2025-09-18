import { backgroundloginpage } from "@/assets/image";
import { CardEventPageAdministrative } from "@/dto/event/data-card-event-DTO";

// Pega a URL base do backend do env
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function BaseUrl(photoURL: string, props: CardEventPageAdministrative) {
  const photoUrl =
    props.photos.length > 0
      ? `https://api.massapefascinante.com.br/${photoURL}`  // usa a URL do env
      : backgroundloginpage;

  return photoUrl;
}
