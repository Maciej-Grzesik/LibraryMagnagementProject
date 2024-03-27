package org.library.backend.Controller.DTO.UserDto;

import org.library.backend.commonTypes.UserRole;

public class CreateUserDto {
    private String username;
    private String password;
    private UserRole role;
    private String email;
    private String fullUsername;

    public CreateUserDto(String username, String password, UserRole role, String email, String fullUsername) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.fullUsername = fullUsername;
    }

    public CreateUserDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
