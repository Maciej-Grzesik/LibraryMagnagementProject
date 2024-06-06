package org.library.backend.Controller.DTO;

import org.library.backend.commonTypes.UserRole;

public class LoginResponseDto {
    private String token;

    private String username;

    private UserRole userRole;

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token){
        this.token = token;
    }

    public LoginResponseDto(String token, String username, UserRole userRole) {
        this.token = token;
        this.username = username;
        this.userRole = userRole;
    }
}
