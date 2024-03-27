package org.library.backend.Controller.DTO.LoanDto;

import org.library.backend.Infrastructure.Entity.BookEntity;

import java.util.Date;

public class CreateLoanResponseDto {
    private BookEntity book;
    private Date dueDate;

    public CreateLoanResponseDto(BookEntity book, Date dueDate) {
        this.book = book;
        this.dueDate = dueDate;
    }

    public CreateLoanResponseDto() {
    }

    public BookEntity getBook() {
        return book;
    }

    public void setBook(BookEntity book) {
        this.book = book;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
}
