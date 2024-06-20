package org.library.backend.Controller.DTO.ReviewDto;

import java.util.Date;

public class CreateReviewResponseDto {
    private double rating;
    private String comment;

    public CreateReviewResponseDto(double rating, String comment) {
        this.rating = rating;
        this.comment = comment;
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

}
