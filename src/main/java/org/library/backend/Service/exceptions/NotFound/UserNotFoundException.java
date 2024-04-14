package org.library.backend.Service.exceptions.NotFound;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User with ID " + id + " was not found.");
    }
}
