package org.library.backend.Controller.DTO.BookInfoDto;

public class GetBookInfoDto {
    private String genre;
    private String summary;
    private String imgURL;

    public GetBookInfoDto(String genre, String summary, String imgURL) {
        this.genre = genre;
        this.summary = summary;
        this.imgURL = imgURL;
    }

    public GetBookInfoDto() {
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
