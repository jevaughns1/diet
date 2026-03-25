package com.skillstorm.diet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.diet.Dto.EditLogDto;
import com.skillstorm.diet.model.DailyLog;
import com.skillstorm.diet.model.FoodItem;
import com.skillstorm.diet.service.DailyLogService;

@RestController
@RequestMapping("/daily-log")
public class DailyLogController {

    @Autowired
    private DailyLogService dailyLogService;

    @PostMapping("/log-meal")
    public ResponseEntity<String> logMeal(@RequestParam String userId, @RequestBody List<FoodItem> foodItems) {
        dailyLogService.logMeal(userId, foodItems);
        return ResponseEntity.ok("Meal logged successfully");
    }

    @PutMapping("/edit-log")
    public ResponseEntity<String> editLog(@RequestBody EditLogDto dto) {
        dailyLogService.updateLog(dto.getLogId(), dto.getFoodItems(), dto.getMealType(), dto.getTime());
        return ResponseEntity.ok("Log updated successfully");
    }

    @DeleteMapping("/delete-log")
    public ResponseEntity<String> deleteLog(@RequestParam String logId) {
        dailyLogService.deleteLog(logId);
        return ResponseEntity.ok("Log deleted successfully");
    }

    @GetMapping("/user-logs")
    public ResponseEntity<List<DailyLog>> getUserLogs(@RequestParam String userId) {
        List<DailyLog> logs = dailyLogService.getLogsForUser(userId);
        return ResponseEntity.ok(logs);
    }
}
