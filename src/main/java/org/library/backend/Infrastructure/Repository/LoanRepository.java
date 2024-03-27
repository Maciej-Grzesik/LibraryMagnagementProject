package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.LoanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {
    List<LoanEntity> findAllByUserId(long userId);
}
