package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * BookRepository provides CRUD operations for BookEntity objects in the database.
 */
@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
}
