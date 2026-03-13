package com.skillstorm.diet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.diet.model.DailyLog;
import com.skillstorm.diet.model.FoodItem;
import com.skillstorm.diet.model.User;
import com.skillstorm.diet.repository.UserRepo;
import com.skillstorm.diet.service.DailyLogService;
import com.skillstorm.diet.service.NutritionService;

@RestController
@RequestMapping("/daily-log")
public class DailyLogController {

    @Autowired
    private DailyLogService dailyLogService;

    @Autowired
    private NutritionService nutritionService;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/log-meal")
    public ResponseEntity<String> logMeal(@RequestParam String userId, @RequestBody List<FoodItem> foodItems) {
        dailyLogService.logMeal(userId, foodItems);
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        StringBuilder feedback = new StringBuilder();
        for (FoodItem item : foodItems) {
            String validation = nutritionService.validateDiet(item, user.getDietType());
            if (!"OK".equals(validation)) {
                feedback.append(validation).append("\n");
            }
        }
        var macros = nutritionService.calculateMacros(foodItems);
        feedback.append(nutritionService.getMacroFeedback(user, macros));
        return ResponseEntity.ok(feedback.toString());
    }

    @GetMapping("/user-logs")
    public ResponseEntity<List<DailyLog>> getUserLogs(@RequestParam String userId) {
        List<DailyLog> logs = dailyLogService.getLogsForUser(userId);
        return ResponseEntity.ok(logs);
    }
}
