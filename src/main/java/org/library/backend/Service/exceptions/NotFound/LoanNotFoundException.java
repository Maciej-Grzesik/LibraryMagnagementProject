package org.library.backend.Service.exceptions.NotFound;

public class LoanNotFoundException extends RuntimeException {
    public LoanNotFoundException(Long id) {
        super("Loan with ID " + id + " was not found.");
    }
}