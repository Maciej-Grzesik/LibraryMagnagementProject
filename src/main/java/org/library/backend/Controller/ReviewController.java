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

@RestController
@RequestMapping("/api/review")
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/getByBook/{id}")
    public List<GetReviewDto> getAllByBookId(@PathVariable long id){
        return reviewService.getReviewsByBookId(id);
    }

    @GetMapping("/getByUser/{id}")
    public List<GetReviewDto> getAllByUserId(@PathVariable long id){
        return reviewService.getReviewsByUserId(id);
    }

    @PostMapping("/create")
    public ResponseEntity<CreateReviewResponseDto> createReview(@RequestBody CreateReviewDto reviewDto) {
        var newReview = reviewService.createReview(reviewDto);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
