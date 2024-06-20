package org.library.backend.Controller.DTO.ReviewDto;

import java.util.Date;

public class CreateReviewDto {
    private String username;
    private String bookTitle;
    private double rating;
    private String comment;


    public CreateReviewDto(String username, String bookTitle, double rating, String comment) {
        this.username = username;
        this.bookTitle = bookTitle;
        this.rating = rating;
        this.comment = comment;

    }

    public CreateReviewDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUserId(String userId) {
        this.username = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

}
