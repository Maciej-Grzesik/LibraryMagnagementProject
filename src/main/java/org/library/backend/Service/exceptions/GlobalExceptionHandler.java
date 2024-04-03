package org.library.backend.Service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handleUserAlreadyExistsException(UserAlreadyExistsException ex, WebRequest request) {
        return new ErrorMessage(HttpStatus.CONFLICT.value(), ex.getMessage());
    }

    @ExceptionHandler({
            UserAlreadyExistsException.class,
            UsernameNotFoundException.class,
            BookNotFoundException.class,
            ReviewNotFoundException.class,
            LoanNotFoundException.class,
            UserNotFoundException.class
    })
    public ResponseEntity<ErrorMessage> handleNotFoundExceptions(Exception ex, WebRequest request) {
        HttpStatus status = (ex instanceof UserAlreadyExistsException) ? HttpStatus.CONFLICT : HttpStatus.NOT_FOUND;
        ErrorMessage errorMessage = new ErrorMessage(status.value(), ex.getMessage());
        return new ResponseEntity<>(errorMessage, status);
    }

    public static class ErrorMessage {
        private int statusCode;
        private String message;

        public ErrorMessage(int statusCode, String message) {
            this.statusCode = statusCode;
            this.message = message;
        }

        public int getStatusCode() {
            return statusCode;
        }

        public void setStatusCode(int statusCode) {
            this.statusCode = statusCode;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
