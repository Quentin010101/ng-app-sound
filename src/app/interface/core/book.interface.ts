import { Author } from "./author.interface"
import { Category } from "./category.interface"
import { Chapter } from "./chapter.interface"
import { Image } from "./image.interface"

export class Book{
    id_book!: number
    title!: string
    description!: string
    dateUploaded!: Date
    image!: Image
    authors!: Author[]
    categories!: Category[]
    chapters!: Chapter[]
}