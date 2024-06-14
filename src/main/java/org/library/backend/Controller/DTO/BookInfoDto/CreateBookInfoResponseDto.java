package org.library.backend.Controller.DTO.BookInfoDto;

import org.library.backend.Infrastructure.Entity.BookEntity;

public class CreateBookInfoResponseDto {
    private long bookId;
    private String genre;
    private String summary;
    private String imgURL;

    public CreateBookInfoResponseDto(long bookId, String genre, String summary, String imgURL) {
        this.bookId = bookId;
        this.genre = genre;
        this.summary = summary;
        this.imgURL = imgURL;
    }

    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getImgURL() {
        return imgURL;
    }

    public void setImgURL(String imgURL) {
        this.imgURL = imgURL;
    }
}
