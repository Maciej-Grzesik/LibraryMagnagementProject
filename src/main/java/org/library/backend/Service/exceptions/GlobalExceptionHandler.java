package org.library.backend.Service.exceptions;

import org.library.backend.Service.exceptions.AlreadyExists.UserAlreadyExistsException;
import org.library.backend.Service.exceptions.NotFound.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * GlobalExceptionHandler is a class responsible for handling exceptions globally in the service layer
 * It provides methods to handle specific types of exceptions and maps them to appropriate HTTP responses
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles UserAlreadyExistsException by returning a conflict response
     *
     * @param ex the UserAlreadyExistsException
     * @return a ResponseEntity containing an error response with a conflict status and the exception message
     */
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

    /**
     * Handles various NotFoundException subclasses by returning a not found response
     *
     * @param ex the NotFoundException
     * @return a ResponseEntity containing an error response with a not found status and the exception message
     */
    @ExceptionHandler({
            UsernameNotFoundException.class,
            BookNotFoundException.class,
            ReviewNotFoundException.class,
            LoanNotFoundException.class,
            UserNotFoundException.class,
            BookInfoNotFoundException.class,
            UsernameNotFoundException.class,
            BookTitleNotFoundException.class
    })
    public ResponseEntity<ErrorResponse> handleNotFoundExceptions(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
}
