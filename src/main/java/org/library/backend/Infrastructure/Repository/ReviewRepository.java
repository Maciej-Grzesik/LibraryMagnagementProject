package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ReviewRepository provides CRUD operations for ReviewEntity objects in the database
 */
@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

    /**
     * Finds all review entities associated with a given book ID
     *
     * @param id the ID of the book
     * @return a list of ReviewEntity objects associated with the given book ID
     */
    List<ReviewEntity> findAllByBookId(long id);

    /**
     * Finds all review entities associated with a given user ID
     *
     * @param id the ID of the user
     * @return a list of ReviewEntity objects associated with the given user ID
     */
    List<ReviewEntity> findAllByUserId(long id);

    List<ReviewEntity> findAllByBookTitle(String title);
}
