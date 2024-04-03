package org.library.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import org.library.backend.Controller.DTO.LoginDto;
import org.library.backend.Controller.DTO.LoginResponseDto;
import org.library.backend.Controller.DTO.RegisterDto;
import org.library.backend.Controller.DTO.RegisterResponseDto;
import org.library.backend.Infrastructure.Entity.AuthEntity;
import org.library.backend.Infrastructure.Entity.UserEntity;
import org.library.backend.Infrastructure.Repository.AuthRepository;
import org.library.backend.Infrastructure.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.library.backend.Service.exceptions.UserAlreadyExistsException;
import org.springframework.web.server.ResponseStatusException;


import java.util.Optional;

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

    public RegisterResponseDto register(RegisterDto registerDto) {
        Optional<AuthEntity> existingAuth = authRepository.findByUsername(registerDto.getUsername());
        if (existingAuth.isPresent()) {
            throw UserAlreadyExistsException.create(registerDto.getUsername());
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(registerDto.getEmail());
        userRepository.save(userEntity);

        AuthEntity authEntity = new AuthEntity();
        authEntity.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        authEntity.setUsername(registerDto.getUsername());
        authEntity.setUserRole(registerDto.getRole());
        authEntity.setUser(userEntity);

        authRepository.save(authEntity);
        return new RegisterResponseDto(authEntity.getId(), authEntity.getUsername(), authEntity.getUserRole());
    }

    public LoginResponseDto login(LoginDto loginDto) {
        AuthEntity authEntity = authRepository.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + loginDto.getUsername()));

        if (!passwordEncoder.matches(loginDto.getPassword(), authEntity.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        String token = jwtService.generateToken(authEntity);

        return new LoginResponseDto(token);
    }
}
