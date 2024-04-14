package org.library.backend.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.library.backend.Infrastructure.Entity.AuthEntity;
import org.library.backend.commonTypes.UserRole;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

/**
 * JwtService class provides services related to JSON Web Tokens (JWT) generation and validation.
 */
@Service
public class JwtService {

    private long tokenLifeTime = 1000 * 60 * 24; // 24 hours

    @Value("${token.signing.key}")
    private String jwtSignInKey;

    /**
     * Generates a JWT token for the provided user details.
     *
     * @param userDetail the user details
     * @return the generated JWT token
     */
    public String generateToken(AuthEntity userDetail) {
        return generateToken(new HashMap<>(), userDetail);
    }

    /**
     * Validates if a JWT token is valid.
     *
     * @param token the JWT token to validate
     * @return true if the token is valid, otherwise false
     */
    public boolean isTokenValid(String token) {
        try {
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Extracts the username from a JWT token.
     *
     * @param token the JWT token
     * @return the extracted username
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    /**
     * Checks whether the token is expired
     *
     * @param token the JWT token
     * @return true is yes, else false
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    /**
     * Extracts expiration claim
     *
     * @param token the JWT token
     * @return the extracted claim
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extracts the role from a JWT token.
     *
     * @param token the JWT token
     * @return the extracted role
     */
    public UserRole extractRole(String token) {
        String roleString = extractClaim(token, (claims -> claims.get("role", String.class)));
        return UserRole.valueOf(roleString);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    /**
     * Generates a new token with additional claims based on user details.
     *
     * @param extraClaims additional claims to include in the token
     * @param userDetails the user details
     * @return the new token
     */
    private String generateToken(Map<String, Object> extraClaims, AuthEntity userDetails) {
        extraClaims.put("role", userDetails.getUserRole());
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + tokenLifeTime))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Returns signing key
     *
     * @return the signing key
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSignInKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
