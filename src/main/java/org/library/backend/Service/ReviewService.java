package org.library.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import org.library.backend.Controller.DTO.ReviewDto.CreateReviewDto;
import org.library.backend.Controller.DTO.ReviewDto.CreateReviewResponseDto;
import org.library.backend.Controller.DTO.ReviewDto.GetReviewDto;
import org.library.backend.Infrastructure.Entity.ReviewEntity;
import org.library.backend.Infrastructure.Repository.BookRepository;
import org.library.backend.Infrastructure.Repository.ReviewRepository;
import org.library.backend.Infrastructure.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public List<GetReviewDto> getReviewsByBookId(long id) {
        var reviews = reviewRepository.findAllByBookId(id);
        return reviews.stream().map((review) -> new GetReviewDto(review.getRating(), review.getComment(), review.getDate())).collect(Collectors.toList());
    }

    public List<GetReviewDto> getReviewsByUserId(long id) {
        var reviews = reviewRepository.findAllByUserId(id);
        return reviews.stream().map((review) -> new GetReviewDto(review.getRating(), review.getComment(), review.getDate())).collect(Collectors.toList());
    }

    public CreateReviewResponseDto createReview(CreateReviewDto reviewDto) {
        var userEntity = userRepository.findById(reviewDto.getUserId()).orElseThrow(EntityNotFoundException::new);
        var bookEntity = bookRepository.findById(reviewDto.getBookId()).orElseThrow(EntityNotFoundException::new);
        var reviewEntity = new ReviewEntity();

        reviewEntity.setBook(bookEntity);
        reviewEntity.setUser(userEntity);
        reviewEntity.setComment(reviewDto.getComment());
        reviewEntity.setRating(reviewDto.getRating());
        reviewEntity.setDate(reviewDto.getDate());

        var newReview = reviewRepository.save(reviewEntity);
        return new CreateReviewResponseDto(newReview.getRating(), newReview.getComment(), newReview.getDate());
    }

    public void deleteReview(long id) {
        if(!reviewRepository.existsById(id)) {
            throw new EntityNotFoundException();
        }
        reviewRepository.deleteById(id);
    }
}
