package org.library.backend.Service;

import org.library.backend.Controller.DTO.*;
import org.library.backend.Infrastructure.Entity.AuthEntity;
import org.library.backend.Infrastructure.Entity.UserEntity;
import org.library.backend.Infrastructure.Repository.AuthRepository;
import org.library.backend.Infrastructure.Repository.UserRepository;
import org.library.backend.Service.exceptions.AlreadyExists.UserAlreadyExistsException;
import org.library.backend.commonTypes.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

/**
 * AuthService class provides authentication-related services such as user registration and login
 */
@Service
public class AuthService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(AuthRepository authRepository, UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registers a new user with the provided registration details
     *
     * @param registerDto the registration details
     * @return the response containing registration information
     */
    public RegisterResponseDto register(RegisterDto registerDto) {

        Optional<AuthEntity> existingAuth = authRepository.findByUsername(registerDto.getUsername());
        if (existingAuth.isPresent()) {
            throw UserAlreadyExistsException.create(registerDto.getUsername());
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(registerDto.getEmail());
        userEntity.setFullUsername(registerDto.getUsername());
        UserEntity createdUser = userRepository.save(userEntity);

        AuthEntity authEntity = new AuthEntity();
        authEntity.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        authEntity.setUsername(registerDto.getUsername());
        authEntity.setUserRole(registerDto.getRole());
        authEntity.setUser(createdUser);

        AuthEntity createdAuth = authRepository.save(authEntity);
        return new RegisterResponseDto(createdAuth.getId(), createdAuth.getUsername(), createdAuth.getUserRole());
    }

    /**
     * Authenticates a user with the provided login details
     *
     * @param loginDto the login details
     * @return the response containing authentication token
     */
    public LoginResponseDto login(LoginDto loginDto) {
        AuthEntity authEntity = authRepository.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + loginDto.getUsername()));

        if (!passwordEncoder.matches(loginDto.getPassword(), authEntity.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }
        String token = jwtService.generateToken(authEntity);
        String username = loginDto.getUsername();
        UserRole userRole = authEntity.getUserRole();
        return new LoginResponseDto(token, username, userRole);
    }

    public void updatePassword(UpdatePasswordDto passwordDto) {
        AuthEntity authEntity = authRepository.findByUsername(passwordDto.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + passwordDto.getUsername()));

        if (!passwordEncoder.matches(passwordDto.getCurrentPassword(), authEntity.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        authEntity.setPassword(passwordEncoder.encode(passwordDto.getNewPassword()));
        authRepository.save(authEntity);
    }
}
