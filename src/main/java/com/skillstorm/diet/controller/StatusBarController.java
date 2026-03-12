package com.skillstorm.diet.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.diet.Dto.DailyStatusDto;
import com.skillstorm.diet.model.DailyLog;
import com.skillstorm.diet.model.FoodItem;
import com.skillstorm.diet.model.User;
import com.skillstorm.diet.repository.UserRepo;
import com.skillstorm.diet.service.DailyLogService;
import com.skillstorm.diet.service.NutritionService;

@RestController
@RequestMapping("/status-bar")
public class StatusBarController {

    @Autowired
    private DailyLogService dailyLogService;

    @Autowired
    private NutritionService nutritionService;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/daily")
    public ResponseEntity<DailyStatusDto> getDailyStatus(@RequestParam String userId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        String today = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        List<DailyLog> logs = dailyLogService.getLogsForUser(userId);
        double protein = 0, carbs = 0, fat = 0, calories = 0;
        for (DailyLog log : logs) {
            String logDate = new SimpleDateFormat("yyyy-MM-dd").format(log.getDate());
            if (today.equals(logDate)) {
                for (FoodItem item : log.getFoodItems()) {
                    protein += item.getProtein();
                    carbs += item.getCarbs();
                    fat += item.getFat();
                    calories += item.getCalories();
                }
            }
        }
        Map<String, Double> consumedMacros = new HashMap<>();
        consumedMacros.put("protein", protein);
        consumedMacros.put("carbs", carbs);
        consumedMacros.put("fat", fat);
        consumedMacros.put("calories", calories);
        Map<String, Double> targets = new HashMap<>();
        targets.put("protein", user.getProteinTarget());
        targets.put("carbs", user.getCarbTarget());
        targets.put("fat", user.getFatTarget());
        targets.put("calories", user.getCalorieTarget());
        String feedback = nutritionService.getMacroFeedback(user, consumedMacros);
        DailyStatusDto dto = new DailyStatusDto();
        dto.setUserId(userId);
        dto.setDate(today);
        dto.setConsumedMacros(consumedMacros);
        dto.setTargets(targets);
        dto.setFeedback(feedback);
        return ResponseEntity.ok(dto);
    }
}
