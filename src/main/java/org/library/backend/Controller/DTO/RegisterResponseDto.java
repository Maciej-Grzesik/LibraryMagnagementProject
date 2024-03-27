package org.library.backend.Controller.DTO;

import org.library.backend.commonTypes.UserRole;

public class RegisterResponseDto {
    private long id;
    private String username;
    private UserRole role;

    public RegisterResponseDto(long id, String username, UserRole role) {
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }
}
