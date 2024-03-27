package org.library.backend.Infrastructure.Entity;

import jakarta.persistence.*;
import org.library.backend.commonTypes.UserRole;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user", catalog = "library")
public class UserEntity {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private AuthEntity auth;

    @OneToMany(mappedBy = "user")
    private List<LoanEntity> loanEntities = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<ReviewEntity> reviewEntities = new ArrayList<>();

//    @Basic(optional = false)
//    @Column(name = "username", unique = true, length = 50)
//    private String username;
//
//    @Basic(optional = false)
//    @Column(name = "password", length = 50)
//    private String password;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "user_role")
//    private UserRole role;

    @Basic(optional = false)
    @Column(name = "email")
    private String email;

    @Basic(optional = false)
    @Column(name = "full_username")
    private String fullUsername;

    public List<LoanEntity> getLoanEntities() {
        return loanEntities;
    }

    public void setLoanEntities(List<LoanEntity> rentalEntities) {
        this.loanEntities = rentalEntities;
    }

    public List<ReviewEntity> getReviewEntities() {
        return reviewEntities;
    }

    public void setReviewEntities(List<ReviewEntity> reviewEntities) {
        this.reviewEntities = reviewEntities;
    }

//    public String getUsername() {
//        return username;
//    }

//    public void setUsername(String username) {
//        this.username = username;
//    }

//    public String getPassword() {
//        return password;
//    }

//    public void setPassword(String password) {
//        this.password = password;
//    }

//    public UserRole getRole() {
//        return role;
//    }

//    public void setRole(UserRole role) {
//        this.role = role;
//    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullUsername() {
        return fullUsername;
    }

    public void setFullUsername(String fullUsername) {
        this.fullUsername = fullUsername;
    }
}
