package org.library.backend.Controller.DTO.UserDto;

import org.library.backend.commonTypes.UserRole;

public class GetUserDto {
    private String username;
    private UserRole role;
    private String email;
    private String fullUsername;

    public GetUserDto(String username, UserRole role, String email, String fullUsername) {
        this.username = username;
        this.role = role;
        this.email = email;
        this.fullUsername = fullUsername;
    }

    public GetUserDto() {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullUsername() {
        return fullUsername;
    }

    public void setFullUsername(String fullUsername) {
        this.fullUsername = fullUsername;
    }
}
