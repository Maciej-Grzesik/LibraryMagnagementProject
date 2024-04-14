package org.library.backend.Controller;

import org.library.backend.Controller.DTO.LoginDto;
import org.library.backend.Controller.DTO.LoginResponseDto;
import org.library.backend.Controller.DTO.RegisterDto;
import org.library.backend.Controller.DTO.RegisterResponseDto;
import org.library.backend.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * AuthController class handles authentication-related endpoints such as registration and login
 * It exposes endpoints for user registration and login, with appropriate access control based on user roles
 */
@RestController
@RequestMapping("/api/auth")
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
    @PreAuthorize("permitAll()")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody RegisterDto requestBody) {
        System.out.println("Received registration request: " + requestBody.toString());
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
}
