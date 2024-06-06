package org.library.backend.Service.exceptions.NotFound;

public class BookTitleNotFoundException extends RuntimeException{
    public BookTitleNotFoundException(String title) {
            super("BookInfo with ID " + title + " was not found.");
        }

}
