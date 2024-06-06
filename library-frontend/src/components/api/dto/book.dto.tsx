export class GetBookDTO {
    id: number | undefined
    isbn: string | undefined
    title: string | undefined
    author: string | undefined
    publisher: string | undefined
    publishYear: number | undefined
    availableCopies: number | undefined
}

export class CreateBookDTO {
    isbn: string | undefined
    title: string | undefined
    author: string | undefined
    publisher: string | undefined
    publishYear: number | undefined
    availableCopies: number | undefined
}

export class ResponseBookDTO {
    id: number | undefined
    isbn: string | undefined
    title: string | undefined
    author: string | undefined
    publisher: string | undefined
    publishYear: number | undefined
    availableCopies: boolean | undefined
}