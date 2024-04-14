package org.library.backend.Service.exceptions.NotFound;

public class BookInfoNotFoundException extends RuntimeException{
    public BookInfoNotFoundException(Long id) {
        super("BookInfo with ID " + id + " was not found.");
    }

}
