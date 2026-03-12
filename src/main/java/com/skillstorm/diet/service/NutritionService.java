package com.skillstorm.diet.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.skillstorm.diet.model.FoodItem;
import com.skillstorm.diet.model.User;

public class NutritionService {

    public Map<String, Double> calculateMacros(List<FoodItem> foodItems) {
        double protein = 0;
        double carbs = 0;
        double fat = 0;
        double calories = 0;
        for (FoodItem item : foodItems) {
            protein += item.getProtein();
            carbs += item.getCarbs();
            fat += item.getFat();
            calories += item.getCalories();
        }
        Map<String, Double> macros = new HashMap<>();
        macros.put("protein", protein);
        macros.put("carbs", carbs);
        macros.put("fat", fat);
        macros.put("calories", calories);
        return macros;
    }

    public String validateDiet(FoodItem item, String dietType) {
        switch (dietType.toLowerCase()) {
            case "keto" -> {
                if (item.getCarbs() > 5) {
                    return "Warning: This item contains " + item.getCarbs() + "g of carbs, which breaks Keto.";
                }
            }
            case "vegan" -> {

                if (item.getName().toLowerCase().contains("egg") || item.getName().toLowerCase().contains("meat")
                        || item.getName().toLowerCase().contains("milk")) {
                    return "Warning: This item is not vegan.";
                }

            }

        }
        return "OK";
    }

    public String getMacroFeedback(User user, Map<String, Double> consumedMacros) {
        double proteinTarget = user.getProteinTarget();
        double proteinConsumed = consumedMacros.getOrDefault("protein", 0.0);
        if (proteinConsumed < proteinTarget) {
            return "You are " + (proteinTarget - proteinConsumed) + "g short of your protein goal for muscle growth.";
        }

        return "All macro goals met.";
    }
}
