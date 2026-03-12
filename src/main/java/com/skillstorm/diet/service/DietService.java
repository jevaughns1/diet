package com.skillstorm.diet.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.skillstorm.diet.model.Diet;
import com.skillstorm.diet.model.FoodItem;
import com.skillstorm.diet.repository.DietRepo;

@Service
public class DietService {
    private final DietRepo dietRepo;

    public DietService(DietRepo dietRepo) {
        this.dietRepo = dietRepo;
    }

    public Diet addFoodItem(String dietId, FoodItem foodItem) {
        Optional<Diet> dietOpt = dietRepo.findById(dietId);
        if (dietOpt.isEmpty()) {
            throw new IllegalArgumentException("Diet not found");
        }
        Diet diet = dietOpt.get();
        diet.getFoodItems().add(foodItem);
        return dietRepo.save(diet);
    }

    public Diet removeFoodItem(String dietId, String foodName) {
        Optional<Diet> dietOpt = dietRepo.findById(dietId);
        if (dietOpt.isEmpty()) {
            throw new IllegalArgumentException("Diet not found");
        }
        Diet diet = dietOpt.get();
        diet.getFoodItems().removeIf(item -> item.getName().equalsIgnoreCase(foodName));
        return dietRepo.save(diet);
    }

    public double getTotalCalories(String dietId) {
        Optional<Diet> dietOpt = dietRepo.findById(dietId);
        if (dietOpt.isEmpty()) {
            throw new IllegalArgumentException("Diet not found");
        }
        return dietOpt.get().getFoodItems().stream()
                .mapToDouble(FoodItem::getCalories)
                .sum();
    }

    public double getTotalCarbs(String dietId) {
        Optional<Diet> dietOpt = dietRepo.findById(dietId);
        if (dietOpt.isEmpty()) {
            throw new IllegalArgumentException("Diet not found");
        }
        return dietOpt.get().getFoodItems().stream()
                .mapToDouble(FoodItem::getCarbs)
                .sum();
    }

    public double getTotalProtein(String dietId) {
        Optional<Diet> dietOpt = dietRepo.findById(dietId);
        if (dietOpt.isEmpty()) {
            throw new IllegalArgumentException("Diet not found");
        }
        return dietOpt.get().getFoodItems().stream()
                .mapToDouble(FoodItem::getProtein)
                .sum();
    }

    public double getTotalFat(String dietId) {
        Optional<Diet> dietOpt = dietRepo.findById(dietId);
        if (dietOpt.isEmpty()) {
            throw new IllegalArgumentException("Diet not found");
        }
        return dietOpt.get().getFoodItems().stream()
                .mapToDouble(FoodItem::getFat)
                .sum();
    }

    public Diet getDiet(String id) {
        Diet diet = dietRepo.findByPublicId(id).orElseThrow(() -> new IllegalArgumentException("Diet not found"));

        return diet;
    }
}
