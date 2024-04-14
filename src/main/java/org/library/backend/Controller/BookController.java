package org.library.backend.Controller;

import org.library.backend.Controller.DTO.BookDto.CreateBookDto;
import org.library.backend.Controller.DTO.BookDto.CreateBookResponseDto;
import org.library.backend.Controller.DTO.BookDto.GetBookDto;
import org.library.backend.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * BookController class handles endpoints related to book management
 * It exposes endpoints for retrieving all books, retrieving a single book by ID,
 * creating a new book, and deleting an existing book
 */
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /**
     * Endpoint to retrieve all books
     *
     * @return the list of GetBookDto representing all books
     */
    @GetMapping("/getAll")
    public List<GetBookDto> getAllBooks() {
        return bookService.getAll();
    }

    /**
     * Endpoint to retrieve a single book by ID
     *
     * @param id the ID of the book to retrieve
     * @return the GetBookDto representing the requested book
     */
    @GetMapping("/getById/{id}")
    public GetBookDto getOneBook(@PathVariable long id) {
        return bookService.getBookById(id);
    }

    /**
     * Endpoint to create a new book
     *
     * @param bookDto the CreateBookDto containing information about the book to be created
     * @return the ResponseEntity containing the CreateBookResponseDto representing the newly created book
     */
    @PostMapping("/create")
    public ResponseEntity<CreateBookResponseDto> createBook(@RequestBody CreateBookDto bookDto) {
        var newBook = bookService.createBook(bookDto);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    /**
     * Endpoint to delete a book by ID
     *
     * @param id the ID of the book to delete
     * @return the ResponseEntity indicating the success of the deletion operation
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable long id){
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
