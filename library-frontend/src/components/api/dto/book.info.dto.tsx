export class CreateBookInfoDTO {
    bookId: number | undefined
    genre: string | undefined
    summary: string | undefined
    imgURL: string | undefined
}

export class GetBookInfoDTO {
    genre: string | undefined
    summary: string | undefined
    imgURL: string | undefined
}