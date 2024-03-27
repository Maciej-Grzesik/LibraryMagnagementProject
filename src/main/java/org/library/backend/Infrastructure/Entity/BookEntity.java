package org.library.backend.Infrastructure.Entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "book", catalog = "library")
public class BookEntity {
    @Id
    @Column(name = "book_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "book")
    private List<LoanEntity> loanEntities = new ArrayList<>();

    @OneToMany(mappedBy = "book")
    private List<ReviewEntity> reviewEntities = new ArrayList<>();

    @Basic(optional = false)
    @Column(name = "isbn", unique = true, length = 13)
    private String isbn;

    @Basic(optional = false)
    @Column(name = "title", unique = true, length = 255)
    private String title;

    @Basic(optional = false)
    @Column(name = "author", length = 255)
    private String author;

    @Basic(optional = false)
    @Column(name = "publisher", length = 255)
    private String publisher;

    @Basic(optional = false)
    @Column(name = "publish_year")
    private int publishYear;

    @Basic(optional = false)
    @Column(name = "available_copies")
    private int availableCopies;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<LoanEntity> getLoanEntities() {
        return loanEntities;
    }

    public void setLoanEntities(List<LoanEntity> loanEntities) {
        this.loanEntities = loanEntities;
    }

    public List<ReviewEntity> getReviewEntities() {
        return reviewEntities;
    }

    public void setReviewEntities(List<ReviewEntity> reviewEntities) {
        this.reviewEntities = reviewEntities;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public int getPublishYear() {
        return publishYear;
    }

    public void setPublishYear(int publishYear) {
        this.publishYear = publishYear;
    }

    public int getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(int availableCopies) {
        this.availableCopies = availableCopies;
    }
}
