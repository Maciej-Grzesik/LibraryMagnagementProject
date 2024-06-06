package org.library.backend.Service;

import org.library.backend.Controller.DTO.BookDto.CreateBookDto;
import org.library.backend.Controller.DTO.BookDto.CreateBookResponseDto;
import org.library.backend.Controller.DTO.BookDto.GetBookDto;
import org.library.backend.Infrastructure.Entity.BookEntity;
import org.library.backend.Infrastructure.Repository.BookRepository;
import org.library.backend.Service.exceptions.NotFound.BookNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * BookService class provides services related to book management
 */
@Service
public class BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * Retrieves all books
     *
     * @return the list of GetBookDto representing all books
     */
    public List<GetBookDto> getAll() {
        var books = bookRepository.findAll();

        return books.stream().map((book) -> new GetBookDto(book.getId(), book.getIsbn(), book.getTitle(), book.getAuthor(), book.getPublisher(), book.getPublishYear(), book.getAvailableCopies())).collect(Collectors.toList());
    }

    /**
     * Retrieves a book by ID
     *
     * @param id the ID of the book to retrieve
     * @return the GetBookDto representing the requested book
     * @throws BookNotFoundException if the book with the specified ID is not found
     */
    public GetBookDto getBookById(long id) {
        var book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
        return new GetBookDto(book.getId(), book.getIsbn(), book.getTitle(), book.getAuthor(), book.getPublisher(), book.getPublishYear(), book.getAvailableCopies());
    }

    /**
     * Creates a new book
     *
     * @param book the CreateBookDto containing information about the book to be created
     * @return the CreateBookResponseDto representing the newly created book
     */
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

    /**
     * Deletes a book by ID
     *
     * @param id the ID of the book to delete
     * @throws BookNotFoundException if the book with the specified ID is not found
     */
    public void deleteBook(long id) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException(id);
        }
        bookRepository.deleteById(id);
    }
}
