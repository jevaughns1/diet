package com.skillstorm.diet.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.skillstorm.diet.model.FoodItem;
import com.skillstorm.diet.model.User;

@Service
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
        String name = item.getName().toLowerCase();
        switch (dietType.toLowerCase()) {
            case "keto" -> {
                if (item.getCarbs() > 5) {
                    return "Warning: This item contains " + item.getCarbs() + "g of carbs, which breaks Keto.";
                }
            }
            case "vegan" -> {
                if (name.contains("egg") || name.contains("meat") || name.contains("milk") || name.contains("cheese")
                        || name.contains("fish") || name.contains("chicken")) {
                    return "Warning: This item is not vegan.";
                }
            }
            case "paleo" -> {
                if (name.contains("bread") || name.contains("rice") || name.contains("pasta") || name.contains("beans")
                        || name.contains("cheese") || name.contains("milk")) {
                    return "Warning: This item is not Paleo.";
                }
            }
            case "mediterranean" -> {
                if (name.contains("processed") || name.contains("soda") || name.contains("candy")) {
                    return "Warning: This item is not Mediterranean diet friendly.";
                }
            }
            case "dairy-free" -> {
                if (name.contains("milk") || name.contains("cheese") || name.contains("yogurt")
                        || name.contains("butter")) {
                    return "Warning: This item contains dairy.";
                }
            }
            case "high-fiber" -> {
                if (item.getCarbs() < 5) {
                    return "Warning: This item is low in fiber.";
                }
            }
            // Add more diet types as needed
        }
        return "OK";
    }

    public String getMacroFeedback(User user, Map<String, Double> consumedMacros) {
        double proteinTarget = user.getProteinTarget();
        double carbTarget = user.getCarbTarget();
        double fatTarget = user.getFatTarget();
        double calorieTarget = user.getCalorieTarget();
        double proteinConsumed = consumedMacros.getOrDefault("protein", 0.0);
        double carbConsumed = consumedMacros.getOrDefault("carbs", 0.0);
        double fatConsumed = consumedMacros.getOrDefault("fat", 0.0);
        double calorieConsumed = consumedMacros.getOrDefault("calories", 0.0);

        StringBuilder feedback = new StringBuilder();
        if (proteinConsumed < proteinTarget) {
            feedback.append("You are ").append(proteinTarget - proteinConsumed)
                    .append("g short of your protein goal for muscle growth.\n");
        } else {
            feedback.append("Protein goal met!\n");
        }
        if (carbConsumed > carbTarget) {
            feedback.append("Warning: You have exceeded your carb target by ").append(carbConsumed - carbTarget)
                    .append("g.\n");
        } else {
            feedback.append("Carb goal on track.\n");
        }
        if (fatConsumed < fatTarget) {
            feedback.append("You are ").append(fatTarget - fatConsumed).append("g short of your fat goal.\n");
        } else {
            feedback.append("Fat goal met!\n");
        }
        if (calorieConsumed > calorieTarget) {
            feedback.append("Warning: You have exceeded your calorie target by ")
                    .append(calorieConsumed - calorieTarget).append(" calories.\n");
        } else {
            feedback.append("Calories on track.\n");
        }
        return feedback.toString();
    }
}
