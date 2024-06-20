package org.library.backend.Controller.DTO.LoanDto;

import java.util.Date;

public class UpdateLoanDto {
    private long loanId;
    private Date ReturnDate;

    public UpdateLoanDto(long loanId, Date returnDate) {
        this.loanId = loanId;
        ReturnDate = returnDate;
    }

    public long getLoanId() {
        return loanId;
    }

    public void setLoanId(long loanId) {
        this.loanId = loanId;
    }

    public Date getReturnDate() {
        return ReturnDate;
    }

    public void setReturnDate(Date returnDate) {
        ReturnDate = returnDate;
    }
}
