package com.skillstorm.diet.model;

import lombok.Data;

@Data
public class FoodItem {
    private String name;
    private double calories;
    private double carbs;
    private double protein;
    private double fat;

    public FoodItem() {
    }

    public FoodItem(String name, double calories, double carbs, double protein, double fat) {
        this.name = name;
        this.calories = calories;
        this.carbs = carbs;
        this.protein = protein;
        this.fat = fat;
    }
}
