package org.library.backend.Service.exceptions.NotFound;

public class ReviewNotFoundException extends RuntimeException {
    public ReviewNotFoundException(Long id) {
        super("Review with ID " + id + " was not found.");
    }
}