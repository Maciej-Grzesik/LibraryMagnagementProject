package org.library.backend.Service.exceptions;

public class NoAvailableCopiesException extends RuntimeException {

    public NoAvailableCopiesException(Long bookId) {
            super("Book with ID " + bookId + " was not found.");
    }

}
