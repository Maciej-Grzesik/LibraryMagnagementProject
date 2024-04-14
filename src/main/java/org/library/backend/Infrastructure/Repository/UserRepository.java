package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * UserRepository provides CRUD operations for UserEntity objects in the database
 */
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
