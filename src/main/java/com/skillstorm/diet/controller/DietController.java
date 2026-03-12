package com.skillstorm.diet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.diet.model.Diet;
import com.skillstorm.diet.model.FoodItem;
import com.skillstorm.diet.service.DietService;

@RestController
@RequestMapping("/diet")
public class DietController {

    @Autowired
    private DietService dietService;

    @PostMapping("/{dietId}/food")
    public ResponseEntity<Diet> addFoodItem(@PathVariable String dietId, @RequestBody FoodItem foodItem) {
        Diet updatedDiet = dietService.addFoodItem(dietId, foodItem);
        return ResponseEntity.ok(updatedDiet);
    }

    @DeleteMapping("/{dietId}/food/{foodName}")
    public ResponseEntity<Diet> removeFoodItem(@PathVariable String dietId, @PathVariable String foodName) {
        Diet updatedDiet = dietService.removeFoodItem(dietId, foodName);
        return ResponseEntity.ok(updatedDiet);
    }

    @GetMapping("/{dietId}/calories")
    public ResponseEntity<Double> getTotalCalories(@PathVariable String dietId) {
        double totalCalories = dietService.getTotalCalories(dietId);
        return ResponseEntity.ok(totalCalories);
    }

    @GetMapping("/{dietId}/carbs")
    public ResponseEntity<Double> getTotalCarbs(@PathVariable String dietId) {
        double totalCarbs = dietService.getTotalCarbs(dietId);
        return ResponseEntity.ok(totalCarbs);
    }

    @GetMapping("/{dietId}/protein")
    public ResponseEntity<Double> getTotalProtein(@PathVariable String dietId) {
        double totalProtein = dietService.getTotalProtein(dietId);
        return ResponseEntity.ok(totalProtein);
    }

    @GetMapping("/{dietId}/fat")
    public ResponseEntity<Double> getTotalFat(@PathVariable String dietId) {
        double totalFat = dietService.getTotalFat(dietId);
        return ResponseEntity.ok(totalFat);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Diet> getDiet(@PathVariable String id) {
        Diet diet = dietService.getDiet(id);
        return ResponseEntity.ok(diet);
    }
}
