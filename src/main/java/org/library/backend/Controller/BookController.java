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

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/getAll")
    public List<GetBookDto> getAllBooks() {
        return bookService.getAll();
    }

    @GetMapping("/getById/{id}")
    public GetBookDto getOneBook(@PathVariable long id) {
        return bookService.getBookById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<CreateBookResponseDto> createBook(@RequestBody CreateBookDto bookDto) {
        var newBook = bookService.createBook(bookDto);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable long id){
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
