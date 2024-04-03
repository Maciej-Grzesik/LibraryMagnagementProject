package org.library.backend.Service.exceptions;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(Long bookId) {
        super("Book with ID " + bookId + " was not found.");
    }
}