package org.library.backend.Controller.DTO.ReviewDto;

import java.util.Date;

public class GetReviewDto {
    private double rating;
    private String comment;
    private Date date;
    private String username;

    public GetReviewDto(double rating, String comment, Date date, String username) {
        this.rating = rating;
        this.comment = comment;
        this.date = date;
        this.username = username;
    }

    public GetReviewDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
