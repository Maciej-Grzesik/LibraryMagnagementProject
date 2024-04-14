package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.LoanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * LoanRepository provides CRUD operations for LoanEntity objects in the database
 */
@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {

    /**
     * Finds all loan entities associated with a given user ID
     *
     * @param userId the ID of the user
     * @return a list of LoanEntity objects associated with the given user ID
     */
    List<LoanEntity> findAllByUserId(long userId);
}
