export class CreateReviewDto {
    username: string | undefined;
    bookTitle: string | undefined;
    rating: number | undefined;
    comment: string | undefined;
}

export class GetReviewDto {
    rating: number | undefined;
    comment: string | undefined;
    date: string | undefined;
    username: string | undefined;
}