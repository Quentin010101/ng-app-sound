export class VolumeInfo{
    title!: string
    authors!: string[];
    publisher!: string;
    publishedDate!: string;
    description!: string;
    pageCount!: number;
    categories!: string[];
    imageLinks!: ImageLinks
    language!: string;
    previewLink!: string;
}

export class ImageLinks{
    smallThumbnail!: string
    thumbnail!: string
}