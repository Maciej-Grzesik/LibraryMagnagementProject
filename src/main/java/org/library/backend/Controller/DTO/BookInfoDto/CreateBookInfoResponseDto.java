package org.library.backend.Controller.DTO.BookInfoDto;

import org.library.backend.Infrastructure.Entity.BookEntity;

public class CreateBookInfoResponseDto {
    private BookEntity book;

    public CreateBookInfoResponseDto(BookEntity book) {
        this.book = book;
    }

    public CreateBookInfoResponseDto() {
    }

    public BookEntity getBook() {
        return book;
    }

    public void setBook(BookEntity book) {
        this.book = book;
    }
}
