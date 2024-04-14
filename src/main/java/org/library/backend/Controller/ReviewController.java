package org.library.backend.Controller;

import org.library.backend.Controller.DTO.ReviewDto.CreateReviewDto;
import org.library.backend.Controller.DTO.ReviewDto.CreateReviewResponseDto;
import org.library.backend.Controller.DTO.ReviewDto.GetReviewDto;
import org.library.backend.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ReviewController class handles endpoints related to book reviews
 * It exposes endpoints for retrieving reviews by book ID, retrieving reviews by user ID,
 * creating a new review, and deleting an existing review
 */
@RestController
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /**
     * Endpoint to retrieve reviews by book ID
     *
     * @param id the ID of the book
     * @return the list of GetReviewDto representing reviews for the book
     */
    @GetMapping("/getByBook/{id}")
    public List<GetReviewDto> getAllByBookId(@PathVariable long id){
        return reviewService.getReviewsByBookId(id);
    }

    /**
     * Endpoint to retrieve reviews by user ID
     *
     * @param id the ID of the user
     * @return the list of GetReviewDto representing reviews by the user
     */
    @GetMapping("/getByUser/{id}")
    public List<GetReviewDto> getAllByUserId(@PathVariable long id){
        return reviewService.getReviewsByUserId(id);
    }

    /**
     * Endpoint to create a new review
     *
     * @param reviewDto the CreateReviewDto containing information about the review to be created
     * @return the ResponseEntity containing the CreateReviewResponseDto representing the newly created review
     */
    @PostMapping("/create")
    public ResponseEntity<CreateReviewResponseDto> createReview(@RequestBody CreateReviewDto reviewDto) {
        var newReview = reviewService.createReview(reviewDto);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    /**
     * Endpoint to delete a review by ID
     *
     * @param id the ID of the review to delete
     * @return the ResponseEntity indicating the success of the deletion operation
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
