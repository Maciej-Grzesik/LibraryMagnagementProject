package org.library.backend.Controller;

import org.library.backend.Controller.DTO.BookInfoDto.CreateBookInfoDto;
import org.library.backend.Controller.DTO.BookInfoDto.CreateBookInfoResponseDto;
import org.library.backend.Controller.DTO.BookInfoDto.GetBookInfoDto;
import org.library.backend.Service.BookInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * BookInfoController class handles endpoints related to book information management
 * It exposes endpoints for retrieving book information by book ID, creating new book information,
 * and deleting existing book information.
 */
@RestController
@RequestMapping("/api/info")
public class BookInfoController {

    private final BookInfoService bookInfoService;

    @Autowired
    public BookInfoController(BookInfoService bookInfoService) {
        this.bookInfoService = bookInfoService;
    }

    /**
     * Endpoint to retrieve book information by book ID
     *
     * @param id the ID of the book to retrieve information for
     * @return the GetBookInfoDto representing the book information
     */
    @GetMapping("/{id}")
    public GetBookInfoDto getInfo(@PathVariable long id){
        return bookInfoService.getBookInfoByBookId(id);
    }

    /**
     * Endpoint to create new book information
     *
     * @param bookInfoDto the CreateBookInfoDto containing information about the book
     * @return the ResponseEntity containing the CreateBookInfoResponseDto representing the newly created book information
     */
    @PostMapping("/create")
    public ResponseEntity<CreateBookInfoResponseDto> createBookInfo(@RequestBody CreateBookInfoDto bookInfoDto) {
        System.out.println(bookInfoDto.getBookId() + bookInfoDto.getGenre());
        var newBookInfo = bookInfoService.createBookInfo(bookInfoDto);
        return new ResponseEntity<>(newBookInfo, HttpStatus.CREATED);
    }

    /**
     * Endpoint to delete book information by ID
     *
     * @param id the ID of the book information to delete
     * @return the ResponseEntity indicating the success of the deletion operation
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBookInfo(@PathVariable long id) {
        bookInfoService.deleteBookInfo(id);
        return ResponseEntity.noContent().build();
    }
}
