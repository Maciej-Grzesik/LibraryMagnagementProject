export class CreateLoanDTO {
  bookId: number | undefined;
  userId: number | undefined;
  loanDate: string | undefined;
  dueDate: string | undefined;
}

export class GetLoanDTO {
  id: number | undefined;
  title: string | undefined;
  username: string | undefined;
  loanDate: string | undefined;
  dueDate: string | undefined;
  returnDate: string | undefined;
}

export class ResponseLoanDTO {
  bookId: number | undefined;
  dueDate: string | undefined;
}

export class UpdateLoanDTO {
  loanId: number | undefined;
  returnDate: string | undefined;
}
