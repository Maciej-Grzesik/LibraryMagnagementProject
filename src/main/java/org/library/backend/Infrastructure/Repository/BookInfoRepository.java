package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.BookInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookInfoRepository extends JpaRepository<BookInfoEntity, Long> {
    BookInfoEntity findBookInfoEntityByBookId(long id);
}
