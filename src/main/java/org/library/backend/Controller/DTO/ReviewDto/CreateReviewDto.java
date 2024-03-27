package org.library.backend.Controller.DTO.ReviewDto;

import java.util.Date;

public class CreateReviewDto {
    private long userId;
    private long bookId;
    private double rating;
    private String comment;
    private Date date;

    public CreateReviewDto(long userId, long bookId, double rating, String comment, Date date) {
        this.userId = userId;
        this.bookId = bookId;
        this.rating = rating;
        this.comment = comment;
        this.date = date;
    }

    public CreateReviewDto() {
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
