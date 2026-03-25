package com.skillstorm.diet.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.skillstorm.diet.model.DailyLog;

public interface DailyLogRepo extends MongoRepository<DailyLog, String> {
    List<DailyLog> findByUserId(String userId);

    public void deleteByPublicId(String logId);
}
