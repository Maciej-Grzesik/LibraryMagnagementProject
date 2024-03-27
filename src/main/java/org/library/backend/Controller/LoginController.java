//package org.library.backend.Controller;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/login")
//public class LoginController {
//    private final LoginService loginService;
//
//    @Autowired
//    public LoginController(LoginService loginService) {
//        this.loginService = loginService;
//    }
//
//    @PostMapping
//    public ResponseEntity<String> login(@RequestBody LoginForm loginForm) {
//        String token = loginService.userLogin(loginForm);
//        if (token==null) {
//
//        }
//
//    }
//}
