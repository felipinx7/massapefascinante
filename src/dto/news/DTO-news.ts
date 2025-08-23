import { newsSchema } from "@/schemas/news-schema";
import { z } from "zod";
import { Photo } from "../city/data-info-city-DTO";

export type newsDTO = z.infer<typeof newsSchema>

export type CardNoticiasDTO = {
    id?: string,
    author: string,
    title: string,
    content: string,
    photo: Photo[],
    handleDeleteNoticie?: () => void
}