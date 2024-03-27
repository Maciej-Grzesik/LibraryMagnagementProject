package org.library.backend.Controller;

import org.library.backend.Controller.DTO.LoanDto.CreateLoanDto;
import org.library.backend.Controller.DTO.LoanDto.CreateLoanResponseDto;
import org.library.backend.Controller.DTO.LoanDto.GetLoanDto;
import org.library.backend.Service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan")
public class LoanController {
    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @GetMapping("/getById/{id}")
    public GetLoanDto getOneLoan(@PathVariable long id){
        return loanService.getLoanDto(id);
    }

    @GetMapping("/getAllByUser/{id}")
    public List<GetLoanDto> getAllLoans(@PathVariable long id) {
        return loanService.getAllLoansByUserId(id);
    }

    @PostMapping("/create")
    public ResponseEntity<CreateLoanResponseDto> createLoan(@RequestBody CreateLoanDto loanDto) {
        var newLoan = loanService.createLoan(loanDto);
        return new ResponseEntity<>(newLoan, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLoan(@PathVariable long id) {
        loanService.deleteLoan(id);
        return ResponseEntity.noContent().build();
    }
}
