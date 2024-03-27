package org.library.backend.Infrastructure.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "book_info", catalog = "library")
public class BookInfoEntity {
    @Id
    @Column(name = "book_info_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private long id;

    @OneToOne
    @JoinColumn(name = "book_id", referencedColumnName = "book_id")
    private BookEntity book;

    @Basic(optional = false)
    @Column(name = "genre", length = 50)
    private String genre;

    @Basic(optional = false)
    @Column(name = "summary", length = 255)
    private String summary;

    @Basic(optional = false)
    @Column(name = "img_url")
    private String imgURL;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public BookEntity getBook() {
        return book;
    }

    public void setBook(BookEntity book) {
        this.book = book;
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
