//package org.library.backend.Controller;
//
//import org.library.backend.Controller.DTO.UserDto.CreateUserDto;
//import org.library.backend.Controller.DTO.UserDto.CreateUserResponseDto;
//import org.library.backend.Controller.DTO.UserDto.GetUserDto;
//import org.library.backend.Service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/user")
//public class UserController {
//    private final UserService userService;
//
//    @Autowired
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping("/getById/{id}")
//    public GetUserDto getUser(@PathVariable long id) { return userService.getUserById(id); }
//
//    @PostMapping("/create")
//    public ResponseEntity<CreateUserResponseDto> createUser(@RequestBody CreateUserDto userDto) {
//        var newUser = userService.createUser(userDto);
//        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
//        userService.deleteUser(id);
//        return ResponseEntity.noContent().build();
//    }
//}
