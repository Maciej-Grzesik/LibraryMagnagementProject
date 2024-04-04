package org.library.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import org.library.backend.Controller.DTO.BookDto.CreateBookDto;
import org.library.backend.Controller.DTO.BookDto.CreateBookResponseDto;
import org.library.backend.Controller.DTO.BookDto.GetBookDto;
import org.library.backend.Infrastructure.Entity.BookEntity;
import org.library.backend.Infrastructure.Repository.BookRepository;
import org.library.backend.Service.exceptions.BookNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<GetBookDto> getAll() {
        var books = bookRepository.findAll();

        return books.stream().map((book) -> new GetBookDto(book.getId(), book.getIsbn(), book.getTitle(), book.getAuthor(), book.getPublisher(), book.getPublishYear(), book.getAvailableCopies() > 0)).collect(Collectors.toList());
    }

    public GetBookDto getBookById(long id) {
        var book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
        return new GetBookDto(book.getId(), book.getIsbn(), book.getTitle(), book.getAuthor(), book.getPublisher(), book.getPublishYear(), book.getAvailableCopies() > 0);
    }

    public CreateBookResponseDto createBook(CreateBookDto book) {
        var bookEntity = new BookEntity();
        bookEntity.setAuthor(book.getAuthor());
        bookEntity.setIsbn(book.getIsbn());
        bookEntity.setTitle(book.getTitle());
        bookEntity.setPublisher(book.getPublisher());
        bookEntity.setAvailableCopies(book.getAvailableCopies());
        bookEntity.setPublishYear(book.getPublishYear());

        var newBook = bookRepository.save(bookEntity);

        return new CreateBookResponseDto(newBook.getId(), newBook.getIsbn(), newBook.getTitle(), newBook.getAuthor(), newBook.getPublisher(), newBook.getPublishYear(), newBook.getAvailableCopies());
    }

    public void deleteBook(long id) {
        if(!bookRepository.existsById(id)){
            throw new BookNotFoundException(id);
        }
        bookRepository.deleteById(id);
    }
}
