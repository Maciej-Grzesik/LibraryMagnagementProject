package org.library.backend.Controller;

import org.library.backend.Controller.DTO.*;
import org.library.backend.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController class handles authentication-related endpoints such as registration and login
 * It exposes endpoints for user registration and login, with appropriate access control based on user roles
 */
@RestController
@RequestMapping("/api/auth")
@PreAuthorize("hasRole('ADMIN')")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Endpoint for user registration
     *
     * @param requestBody the registration request body
     * @return the ResponseEntity containing the registration response
     */
    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody RegisterDto requestBody) {
        RegisterResponseDto responseDto = authService.register(requestBody);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    /**
     * Endpoint for user login
     *
     * @param loginDto the login request body
     * @return the ResponseEntity containing the login response
     */
    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginDto loginDto) {
        LoginResponseDto dto = authService.login(loginDto);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PutMapping("/updatePassword")
    @PreAuthorize("hasRole('ADMIN') or hasRole('READER')")
    public ResponseEntity<HttpStatus> login(@RequestBody UpdatePasswordDto passwordDto) {
        authService.updatePassword(passwordDto);
        System.out.println(passwordDto.getUsername() + passwordDto.getCurrentPassword() + passwordDto.getNewPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
