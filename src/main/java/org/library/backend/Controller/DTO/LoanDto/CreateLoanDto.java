package org.library.backend.Controller.DTO.LoanDto;

import java.util.Date;

public class CreateLoanDto {
    private String bookTitle;
    private String username;
    private Date loanDate;
    private Date dueDate;

    public CreateLoanDto() {
    }

    public CreateLoanDto(String bookTitle, String username, Date loanDate, Date dueDate) {
        this.bookTitle = bookTitle;
        this.username = username;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
