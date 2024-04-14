package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.BookInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * BookInfoRepository provides CRUD operations for BookInfoEntity objects in the database
 */
@Repository
public interface BookInfoRepository extends JpaRepository<BookInfoEntity, Long> {

    /**
     * Finds a BookInfoEntity by the ID of the associated book
     *
     * @param id the ID of the book
     * @return the BookInfoEntity associated with the given book ID
     */
    BookInfoEntity findBookInfoEntityByBookId(long id);
}
