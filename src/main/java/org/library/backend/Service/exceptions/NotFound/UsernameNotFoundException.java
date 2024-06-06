package org.library.backend.Service.exceptions.NotFound;

public class UsernameNotFoundException extends RuntimeException{
    public UsernameNotFoundException(String username) {
        super("BookInfo with ID " + username + " was not found.");
    }

}
