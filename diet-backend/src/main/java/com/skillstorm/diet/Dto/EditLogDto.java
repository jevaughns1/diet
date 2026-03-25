package com.skillstorm.diet.Dto;

import java.util.List;

import com.skillstorm.diet.model.FoodItem;

public class EditLogDto {
    private String logId;
    private List<FoodItem> foodItems;
    private String mealType;
    private String time;

    public EditLogDto() {
    }

    public String getLogId() {
        return logId;
    }

    public void setLogId(String logId) {
        this.logId = logId;
    }

    public List<FoodItem> getFoodItems() {
        return foodItems;
    }

    public void setFoodItems(List<FoodItem> foodItems) {
        this.foodItems = foodItems;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
