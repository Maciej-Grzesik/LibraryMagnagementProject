package org.library.backend.Infrastructure.Entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "review", catalog = "library")
public class ReviewEntity {

    @Id
    @Column(name = "review_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private UserEntity user;

    @ManyToOne
    private BookEntity book;

    @Basic(optional = false)
    @Column(name = "rating")
    private Double rating;

    @Basic(optional = false)
    @Column(name = "comment", length = 255)
    private String comment;

    @Basic(optional = false)
    @Column(name = "review_date")
    @Temporal(TemporalType.DATE)
    private Date date;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public BookEntity getBook() {
        return book;
    }

    public void setBook(BookEntity book) {
        this.book = book;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
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
