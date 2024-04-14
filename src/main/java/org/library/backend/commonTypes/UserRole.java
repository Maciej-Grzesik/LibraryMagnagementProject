package org.library.backend.commonTypes;

/**
 * The UserRole enum represents the roles that users can have within the library system
 * Users can either have administrative privileges or be regular readers
 */
public enum UserRole {
    /**
     * Represents an administrative role, granting privileges to manage the library system
     */
    ROLE_ADMIN,

    /**
     * Represents a reader role, allowing users to borrow and read books from the library
     */
    ROLE_READER;
}
