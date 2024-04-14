package org.library.backend.Infrastructure.Repository;

import org.library.backend.Infrastructure.Entity.AuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * AuthRepository provides CRUD operations for AuthEntity objects in the database
 */
@Repository
public interface AuthRepository extends JpaRepository<AuthEntity, Long> {

    /**
     * Finds an AuthEntity by its username
     *
     * @param username the username to search for
     * @return an Optional containing the AuthEntity if found, empty otherwise
     */
    Optional<AuthEntity> findByUsername(String username);
}
