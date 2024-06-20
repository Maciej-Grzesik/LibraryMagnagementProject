package org.library.backend.Controller;

import org.library.backend.Controller.DTO.LoanDto.CreateLoanDto;
import org.library.backend.Controller.DTO.LoanDto.CreateLoanResponseDto;
import org.library.backend.Controller.DTO.LoanDto.GetLoanDto;
import org.library.backend.Controller.DTO.LoanDto.UpdateLoanDto;
import org.library.backend.Infrastructure.Entity.LoanEntity;
import org.library.backend.Service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * LoanController class handles endpoints related to loan management
 * It exposes endpoints for retrieving a single loan by ID, retrieving all loans of a user,
 * creating a new loan, and deleting an existing loan
 */
@RestController
@RequestMapping("/api/loan")
public class LoanController {

    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    /**
     * Endpoint to retrieve a single loan by ID
     *
     * @param id the ID of the loan to retrieve
     * @return the GetLoanDto representing the requested loan
     */
    @GetMapping("/getById/{id}")
    public GetLoanDto getOneLoan(@PathVariable long id){
        return loanService.getLoanDto(id);
    }

    /**
     * Endpoint to retrieve all loans of a user by user ID
     *
     * @param id the ID of the user
     * @return the list of GetLoanDto representing all loans of the user
     */
    @GetMapping("/getAllByUser/{id}")
    public List<GetLoanDto> getAllLoansByUser(@PathVariable long id) {
        return loanService.getAllLoansByUserId(id);
    }

    @GetMapping("/getAll")
    public List<GetLoanDto> getAllLoans() {
        return loanService.getAllLoans();
    }

    /**
     * Endpoint to create a new loan
     *
     * @param loanDto the CreateLoanDto containing information about the loan to be created
     * @return the ResponseEntity containing the CreateLoanResponseDto representing the newly created loan
     */
    @PostMapping("/create")
    public ResponseEntity<CreateLoanResponseDto> createLoan(@RequestBody CreateLoanDto loanDto) {
        var newLoan = loanService.createLoan(loanDto);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<GetLoanDto> updateLoan(@RequestBody UpdateLoanDto updateLoanDto) {
        var updatedLoan = loanService.updateLoan(updateLoanDto);
        return new ResponseEntity<>(updatedLoan, HttpStatus.OK);
    }


    /**
     * Endpoint to delete a loan by ID
     *
     * @param id the ID of the loan to delete
     * @return the ResponseEntity indicating the success of the deletion operation
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable long id) {
        loanService.deleteLoan(id);
        return ResponseEntity.noContent().build();
    }
}
