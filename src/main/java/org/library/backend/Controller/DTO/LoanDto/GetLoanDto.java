package org.library.backend.Controller.DTO.LoanDto;

import java.util.Date;

public class GetLoanDto {
    private String title;
    private String username;
    private Date loanDate;
    private Date dueDate;
    private Date returnDate;


    public GetLoanDto() {
    }

    public GetLoanDto(String title, String user, Date loanDate, Date dueDate, Date returnDate) {
        this.title = title;
        this.username = user;
        this.loanDate = loanDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }
}
