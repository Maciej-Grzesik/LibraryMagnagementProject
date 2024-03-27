package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    List<ReviewEntity> findAllByBookId(long id);
    List<ReviewEntity> findAllByUserId(long id);
}
