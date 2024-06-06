package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.BookEntity;
import org.library.backend.Infrastructure.Entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

/**
 * BookRepository provides CRUD operations for BookEntity objects in the database.
 */
@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
    Optional<BookEntity> findByTitle(String title);
}
