
package com.skillstorm.diet.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.skillstorm.diet.model.DailyLog;
import com.skillstorm.diet.model.FoodItem;
import com.skillstorm.diet.repository.DailyLogRepo;
import com.skillstorm.diet.repository.UserRepo;

@Service
public class DailyLogService {
    private final DailyLogRepo dailyLogRepo;
    private final UserRepo userRepo;

    public DailyLogService(DailyLogRepo dailyLogRepo, UserRepo userRepo) {
        this.dailyLogRepo = dailyLogRepo;
        this.userRepo = userRepo;
    }

    public DailyLog logMeal(String userId, List<FoodItem> foodItems) {
        if (userRepo.findByPublicId(userId).isEmpty()) {
            throw new IllegalArgumentException("User not found");
        }
        DailyLog log = new DailyLog();
        log.setUserId(userId);
        log.setDate(new Date());
        log.setFoodItems(foodItems);
        return dailyLogRepo.save(log);
    }

    public List<DailyLog> getLogsForUser(String userId) {
        return dailyLogRepo.findByUserId(userId);
    }

    public void deleteLog(String logId) {
        if (dailyLogRepo.findById(logId).isEmpty()) {
            throw new IllegalArgumentException("Log not found");
        }
        dailyLogRepo.deleteById(logId);

    }

    public DailyLog updateLog(String logId, List<FoodItem> foodItems, String mealType, String time) {
        DailyLog log = dailyLogRepo.findById(logId).orElseThrow(() -> new IllegalArgumentException("Log not found"));
        log.setFoodItems(foodItems);
        // Optionally update mealType and time if your model supports it
        // log.setMealType(mealType);
        // log.setTime(time);
        return dailyLogRepo.save(log);
    }

    public List<DailyLog> getTodayLogsForUser(String userId) {
        Calendar cal = Calendar
                .getInstance();
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        Date startOfDay = cal.getTime();

        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        Date endOfDay = cal.getTime();

        // Use a custom repo method to fetch only within this range
        List<DailyLog> logs = dailyLogRepo.findByUserIdAndDateBetween(userId, startOfDay, endOfDay);
        return logs;
    }
}
