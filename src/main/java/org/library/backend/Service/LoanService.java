package org.library.backend.Service;

import jakarta.persistence.EntityNotFoundException;
import org.library.backend.Controller.DTO.LoanDto.CreateLoanDto;
import org.library.backend.Controller.DTO.LoanDto.CreateLoanResponseDto;
import org.library.backend.Controller.DTO.LoanDto.GetLoanDto;
import org.library.backend.Infrastructure.Entity.LoanEntity;
import org.library.backend.Infrastructure.Repository.BookRepository;
import org.library.backend.Infrastructure.Repository.LoanRepository;
import org.library.backend.Infrastructure.Repository.UserRepository;
import org.library.backend.Service.exceptions.BookNotFoundException;
import org.library.backend.Service.exceptions.LoanNotFoundException;
import org.library.backend.Service.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanService {
    private LoanRepository loanRepository;
    private UserRepository userRepository;
    private BookRepository bookRepository;

    public LoanService(LoanRepository loanRepository, UserRepository userRepository, BookRepository bookRepository) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public GetLoanDto getLoanDto(long id) {
        var loan = loanRepository.findById(id).orElseThrow(() -> new LoanNotFoundException(id));
        return new GetLoanDto(loan.getBook(), loan.getUser(), loan.getLoanDate(), loan.getDueDate(), loan.getReturnDate());
    }

    public List<GetLoanDto> getAllLoansByUserId(long id) {
        var loans = loanRepository.findAllByUserId(id);
        return loans.stream().map((loan) -> new GetLoanDto(loan.getBook(), loan.getUser(), loan.getLoanDate(), loan.getDueDate(), loan.getReturnDate())).collect(Collectors.toList());
    }

    public CreateLoanResponseDto createLoan(CreateLoanDto loanDto) {
        var loanEntity = new LoanEntity();
        var bookEntity = bookRepository.findById(loanDto.getBookId()).orElseThrow(() -> new BookNotFoundException(loanDto.getBookId()));
        var userEntity = userRepository.findById(loanDto.getUserId()).orElseThrow(() -> new UserNotFoundException(loanDto.getUserId()));
        loanEntity.setUser(userEntity);
        loanEntity.setBook(bookEntity);
        loanEntity.setLoanDate(loanDto.getLoanDate());
        loanEntity.setDueDate(loanDto.getDueDate());

        var newLoan = loanRepository.save(loanEntity);

        return new CreateLoanResponseDto(newLoan.getBook(), newLoan.getDueDate());
    }

    public void deleteLoan(long id) {
        if (!loanRepository.existsById(id)){
            throw new LoanNotFoundException(id);
        }
        loanRepository.deleteById(id);
    }
}
