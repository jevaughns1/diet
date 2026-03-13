package com.skillstorm.diet.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.diet.model.User;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    Optional<User> findByUserName(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByPublicId(String publicId);
}