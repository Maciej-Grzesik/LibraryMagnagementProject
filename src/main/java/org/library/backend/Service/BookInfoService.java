package org.library.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import org.library.backend.Controller.DTO.BookInfoDto.CreateBookInfoDto;
import org.library.backend.Controller.DTO.BookInfoDto.CreateBookInfoResponseDto;
import org.library.backend.Controller.DTO.BookInfoDto.GetBookInfoDto;
import org.library.backend.Infrastructure.Entity.BookInfoEntity;
import org.library.backend.Infrastructure.Repository.BookInfoRepository;
import org.library.backend.Infrastructure.Repository.BookRepository;
import org.springframework.stereotype.Service;

@Service
public class BookInfoService {
    private final BookInfoRepository bookInfoRepository;
    private final BookRepository bookRepository;

    public BookInfoService(BookInfoRepository bookInfoRepository, BookRepository bookRepository) {
        this.bookInfoRepository = bookInfoRepository;
        this.bookRepository = bookRepository;
    }

    public GetBookInfoDto getBookInfoByBookId(long id){
        var bookInfo = bookInfoRepository.findBookInfoEntityByBookId(id);
        return new GetBookInfoDto(bookInfo.getGenre(), bookInfo.getSummary(), bookInfo.getImgURL());
    }

    public CreateBookInfoResponseDto createBookInfo(CreateBookInfoDto bookInfoDto) {
        var bookInfoEntity = new BookInfoEntity();
        var bookEntity = bookRepository.findById(bookInfoDto.getBookId()).orElseThrow(EntityNotFoundException::new);
        bookInfoEntity.setBook(bookEntity);
        bookInfoEntity.setGenre(bookInfoDto.getGenre());
        bookInfoEntity.setSummary(bookInfoDto.getSummary());
        bookInfoEntity.setImgURL(bookInfoDto.getImgURL());

        var newBookInfo = bookInfoRepository.save(bookInfoEntity);

        return new CreateBookInfoResponseDto(newBookInfo.getBook());
    }

    public void deleteBookInfo(long id) {
        if (!bookInfoRepository.existsById(id)) {
            throw new EntityNotFoundException();
        }
        bookInfoRepository.deleteById(id);
    }
}
