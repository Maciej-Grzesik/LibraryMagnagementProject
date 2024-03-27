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
import org.library.backend.commonTypes.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        AuthEntity authEntity = authRepository.findByUsername(loginDto.getUsername()).orElseThrow(EntityNotFoundException::new);

        if(!passwordEncoder.matches(loginDto.getPassword(), authEntity.getPassword())) {
            throw new RuntimeException();
        }

        String token = jwtService.generateToken(authEntity);

        return new LoginResponseDto(token);
    }
}
