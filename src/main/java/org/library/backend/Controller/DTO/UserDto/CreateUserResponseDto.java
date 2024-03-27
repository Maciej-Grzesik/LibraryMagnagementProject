package org.library.backend.Controller.DTO.UserDto;

public class CreateUserResponseDto {
    private String username;
    private String email;

    public CreateUserResponseDto(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public CreateUserResponseDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
