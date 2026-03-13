package com.skillstorm.diet.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillstorm.diet.model.Diet;

public interface DietRepo extends MongoRepository<Diet, String> {

    Optional<Diet> findByPublicId(String id);
}
