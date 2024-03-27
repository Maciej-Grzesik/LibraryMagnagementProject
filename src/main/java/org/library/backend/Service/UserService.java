//package org.library.backend.Service;
//
//import jakarta.persistence.EntityNotFoundException;
//import org.library.backend.Controller.DTO.UserDto.CreateUserDto;
//import org.library.backend.Controller.DTO.UserDto.CreateUserResponseDto;
//import org.library.backend.Controller.DTO.UserDto.GetUserDto;
//import org.library.backend.Infrastructure.Entity.UserEntity;
//import org.library.backend.Infrastructure.Repository.UserRepository;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//    private final UserRepository userRepository;
//
//    public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    public GetUserDto getUserById(long id) {
//        var user = userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
//        return new GetUserDto(user.getUsername(), user.getRole(), user.getEmail(), user.getFullUsername());
//    }
//
//    public CreateUserResponseDto createUser(CreateUserDto userDto) {
//        var userEntity = new UserEntity();
////        userEntity.setUsername(userDto.getUsername());
//        userEntity.setEmail(userDto.getEmail());
////        userEntity.setPassword(userDto.getPassword());
////        userEntity.setRole(userDto.getRole());
//        userEntity.setFullUsername(userDto.getFullUsername());
//
//        var newUser = userRepository.save(userEntity);
//
//        return new CreateUserResponseDto(newUser.getUsername(), newUser.getEmail());
//    }
//
//    public void deleteUser(long id) {
//        if (!userRepository.existsById(id)) {
//            throw new EntityNotFoundException();
//        }
//        userRepository.deleteById(id);
//    }
//}
