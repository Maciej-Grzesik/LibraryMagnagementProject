package org.library.backend.Controller.DTO.ReviewDto;

import java.util.Date;

public class GetReviewDto {
    private double rating;
    private String comment;
    private Date date;

    public GetReviewDto(double rating, String comment, Date date) {
        this.rating = rating;
        this.comment = comment;
        this.date = date;
    }

    public GetReviewDto() {
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
