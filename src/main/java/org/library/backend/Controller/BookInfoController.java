package org.library.backend.Controller;

import org.library.backend.Controller.DTO.BookInfoDto.CreateBookInfoDto;
import org.library.backend.Controller.DTO.BookInfoDto.CreateBookInfoResponseDto;
import org.library.backend.Controller.DTO.BookInfoDto.GetBookInfoDto;
import org.library.backend.Service.BookInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/info")
public class BookInfoController {
    private BookInfoService bookInfoService;

    @Autowired
    public BookInfoController(BookInfoService bookInfoService) {
        this.bookInfoService = bookInfoService;
    }

    @GetMapping("/{id}")
    public GetBookInfoDto getInfo(@PathVariable long id){
        return bookInfoService.getBookInfoByBookId(id);
    }

    @PostMapping("/create")
    public ResponseEntity<CreateBookInfoResponseDto> createBookInfo(@RequestBody CreateBookInfoDto bookInfoDto) {
        var newBookInfo = bookInfoService.createBookInfo(bookInfoDto);
        return new ResponseEntity<>(newBookInfo, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBookInfo(@PathVariable long id) {
        bookInfoService.deleteBookInfo(id);
        return ResponseEntity.noContent().build();
    }
}
