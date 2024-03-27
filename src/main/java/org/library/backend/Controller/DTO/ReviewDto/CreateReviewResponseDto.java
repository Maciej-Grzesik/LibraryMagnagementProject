package org.library.backend.Controller.DTO.ReviewDto;

import java.util.Date;

public class CreateReviewResponseDto {
    private double rating;
    private String comment;
    private Date date;

    public CreateReviewResponseDto(double rating, String comment, Date date) {
        this.rating = rating;
        this.comment = comment;
        this.date = date;
    }

    public CreateReviewResponseDto() {
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
