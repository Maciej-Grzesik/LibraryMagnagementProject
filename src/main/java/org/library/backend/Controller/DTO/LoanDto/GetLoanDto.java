package org.library.backend.Controller.DTO.LoanDto;

import org.library.backend.Infrastructure.Entity.BookEntity;
import org.library.backend.Infrastructure.Entity.UserEntity;

import java.util.Date;

public class GetLoanDto {
    private BookEntity book;
    private UserEntity user;
    private Date loanDate;
    private Date dueDate;
    private Date returnDate;

    public GetLoanDto(BookEntity book, UserEntity user, Date loanDate, Date dueDate, Date returnDate) {
        this.book = book;
        this.user = user;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
    }

    public GetLoanDto() {
    }

    public BookEntity getBook() {
        return book;
    }

    public void setBook(BookEntity book) {
        this.book = book;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public Date getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(Date loanDate) {
        this.loanDate = loanDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }
}
