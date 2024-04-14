package org.library.backend.Service.exceptions.NotFound;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(Long bookId) {
        super("Book with ID " + bookId + " was not found.");
    }
}