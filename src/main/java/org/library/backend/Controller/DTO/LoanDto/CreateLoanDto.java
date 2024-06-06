package org.library.backend.Controller.DTO.LoanDto;

import java.util.Date;

public class CreateLoanDto {
    private long bookId;
    private long userId;
    private Date loanDate;
    private Date dueDate;

    public CreateLoanDto() {
    }


    public CreateLoanDto(long bookId, long userId, Date loanDate, Date dueDate) {
        this.bookId = bookId;
        this.userId = userId;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
    }

    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
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
}
