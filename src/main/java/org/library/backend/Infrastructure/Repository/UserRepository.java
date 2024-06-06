package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.AuthEntity;
import org.library.backend.Infrastructure.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * UserRepository provides CRUD operations for UserEntity objects in the database
 */
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByAuth(AuthEntity authEntity);
}
