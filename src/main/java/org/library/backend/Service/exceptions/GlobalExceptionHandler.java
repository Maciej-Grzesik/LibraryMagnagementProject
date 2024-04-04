package org.library.backend.Service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

    @ExceptionHandler({
            UsernameNotFoundException.class,
            BookNotFoundException.class,
            ReviewNotFoundException.class,
            LoanNotFoundException.class,
            UserNotFoundException.class,
            BookInfoNotFoundException.class
    })
    public ResponseEntity<ErrorResponse> handleNotFoundExceptions(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

//    @ExceptionHandler({
//            UsernameNotFoundException.class,
//            BookNotFoundException.class,
//            ReviewNotFoundException.class,
//            LoanNotFoundException.class,
//            UserNotFoundException.class
//    })
//    public ResponseEntity<ErrorMessage> handleNotFoundExceptions(Exception ex, WebRequest request) {
//        HttpStatus status = (ex instanceof UserAlreadyExistsException) ? HttpStatus.CONFLICT : HttpStatus.NOT_FOUND;
//        ErrorMessage errorMessage = new ErrorMessage(status.value(), ex.getMessage());
//        return new ResponseEntity<>(errorMessage, status);
//    }
}
