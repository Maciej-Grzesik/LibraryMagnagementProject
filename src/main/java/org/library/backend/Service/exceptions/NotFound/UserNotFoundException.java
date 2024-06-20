package org.library.backend.Service.exceptions.NotFound;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super("User with ID " + id + " was not found.");
    }

    public UserNotFoundException(String username) {
        super("User with username " + username + " was not found.");
    }
}
