package org.library.backend.Service;

import org.library.backend.Controller.DTO.BookInfoDto.CreateBookInfoDto;
import org.library.backend.Controller.DTO.BookInfoDto.CreateBookInfoResponseDto;
import org.library.backend.Controller.DTO.BookInfoDto.GetBookInfoDto;
import org.library.backend.Infrastructure.Entity.BookInfoEntity;
import org.library.backend.Infrastructure.Repository.BookInfoRepository;
import org.library.backend.Infrastructure.Repository.BookRepository;
import org.library.backend.Service.exceptions.NotFound.BookInfoNotFoundException;
import org.library.backend.Service.exceptions.NotFound.BookNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * BookInfoService class provides services related to book information management
 */
@Service
public class BookInfoService {
    private final BookInfoRepository bookInfoRepository;
    private final BookRepository bookRepository;

    @Autowired
    public BookInfoService(BookInfoRepository bookInfoRepository, BookRepository bookRepository) {
        this.bookInfoRepository = bookInfoRepository;
        this.bookRepository = bookRepository;
    }

    /**
     * Retrieves book information by book ID
     *
     * @param id the ID of the book
     * @return the GetBookInfoDto representing the book information
     * @throws BookInfoNotFoundException if book information is not found
     */
    public GetBookInfoDto getBookInfoByBookId(long id){
        var bookInfo = bookInfoRepository.findBookInfoEntityByBookId(id);
        if (bookInfo == null) {
            throw new BookInfoNotFoundException(id);
        }
        return new GetBookInfoDto(bookInfo.getGenre(), bookInfo.getSummary(), bookInfo.getImgURL());
    }

    /**
     * Creates new book information
     *
     * @param bookInfoDto the CreateBookInfoDto containing information about the book
     * @return the CreateBookInfoResponseDto representing the newly created book information
     * @throws BookNotFoundException if the book with the specified ID is not found
     */
    public CreateBookInfoResponseDto createBookInfo(CreateBookInfoDto bookInfoDto) {
        var bookInfoEntity = new BookInfoEntity();
        var bookEntity = bookRepository.findById(bookInfoDto.getBookId())
                .orElseThrow(() -> new BookNotFoundException(bookInfoDto.getBookId()));
        bookInfoEntity.setBook(bookEntity);

        bookInfoEntity.setGenre(bookInfoDto.getGenre());
        bookInfoEntity.setSummary(bookInfoDto.getSummary());
        bookInfoEntity.setImgURL(bookInfoDto.getImgURL());

        var newBookInfo = bookInfoRepository.save(bookInfoEntity);

        return new CreateBookInfoResponseDto(newBookInfo.getBook());
    }

    /**
     * Deletes book information by ID
     *
     * @param id the ID of the book information to delete
     * @throws BookInfoNotFoundException if book information is not found
     */
    public void deleteBookInfo(long id) {
        if (!bookInfoRepository.existsById(id)) {
            throw new BookInfoNotFoundException(id);
        }
        bookInfoRepository.deleteById(id);
    }
}
