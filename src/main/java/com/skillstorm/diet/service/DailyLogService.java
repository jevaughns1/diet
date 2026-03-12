package com.skillstorm.diet.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skillstorm.diet.model.DailyLog;
import com.skillstorm.diet.model.FoodItem;
import com.skillstorm.diet.repository.DailyLogRepo;

@Service
public class DailyLogService {
    private final DailyLogRepo dailyLogRepo;

    public DailyLogService(DailyLogRepo dailyLogRepo) {
        this.dailyLogRepo = dailyLogRepo;
    }

    public DailyLog logMeal(String userId, List<FoodItem> foodItems) {
        DailyLog log = new DailyLog();
        log.setUserId(userId);
        log.setDate(new Date());
        log.setFoodItems(foodItems);
        return dailyLogRepo.save(log);
    }

    public List<DailyLog> getLogsForUser(String userId) {
        return dailyLogRepo.findByUserId(userId);
    }
}
