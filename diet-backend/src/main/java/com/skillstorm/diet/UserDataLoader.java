/*
 * package com.skillstorm.diet;
 * 
 * import java.util.Arrays;
 * import java.util.Calendar;
 * import java.util.Date;
 * 
 * import org.springframework.boot.CommandLineRunner;
 * import org.springframework.context.annotation.Bean;
 * import org.springframework.context.annotation.Configuration;
 * 
 * import com.skillstorm.diet.model.DailyLog;
 * import com.skillstorm.diet.model.FoodItem;
 * import com.skillstorm.diet.model.User;
 * import com.skillstorm.diet.repository.DailyLogRepo;
 * import com.skillstorm.diet.repository.UserRepo;
 * 
 * @Configuration
 * public class UserDataLoader {
 * 
 * @Bean
 * CommandLineRunner loadSampleUser(UserRepo userRepo, DailyLogRepo
 * dailyLogRepo) {
 * return args -> {
 * if (userRepo.count() > 1)
 * return; // Prevent duplicates if sampr already exists
 * 
 * // 1. Create the "Power User"
 * User powerUser = new User();
 * powerUser.setUserName("jfit");
 * powerUser.setEmail("jfit@yahoo.com");
 * powerUser.setPassword("test");
 * powerUser.setDietType("High Protein");
 * powerUser.setProteinTarget(180);
 * powerUser.setCarbTarget(150);
 * powerUser.setFatTarget(70);
 * powerUser.setCalorieTarget(2500);
 * userRepo.save(powerUser);
 * 
 * String pId = powerUser.getPublicId();
 * Calendar cal = Calendar.getInstance();
 * 
 * // 2. Generate 30 Days of Logs
 * // 2. Generate 30 Days of Varied History
 * for (int i = 0; i < 30; i++) {
 * Date date = cal.getTime();
 * 
 * if (i % 7 == 0) {
 * // EVERY 7th DAY: A "Cheat Day" (Missed - Way Over)
 * dailyLogRepo.save(createLog(pId, date,
 * new FoodItem("Deep Dish Pizza", 2200, 250, 80, 110),
 * new FoodItem("Dessert", 800, 120, 10, 45)));
 * } else if (i % 3 == 0) {
 * // EVERY 3rd DAY: "Partial" (Just outside the 'Met' range)
 * // Total: ~2150 (If target is 2500, this is >300 away = Missed/Partial)
 * dailyLogRepo.save(createLog(pId, date,
 * new FoodItem("Light Salad", 400, 20, 30, 25),
 * new FoodItem("Chicken Pasta", 1200, 110, 60, 40),
 * new FoodItem("Snack", 550, 40, 15, 30)));
 * } else if (i % 2 == 0) {
 * // EVERY 2nd DAY: "Perfect Met" (Right on target)
 * // Total: ~2450 (Within 100 of 2500 target)
 * dailyLogRepo.save(createLog(pId, date,
 * new FoodItem("Oatmeal", 500, 70, 20, 10),
 * new FoodItem("Turkey Bowl", 950, 60, 80, 40),
 * new FoodItem("Salmon & Veggies", 1000, 10, 90, 60)));
 * } else {
 * // ODD DAYS: "Met" (Slightly under)
 * // Total: ~2410
 * dailyLogRepo.save(createLog(pId, date,
 * new FoodItem("Protein Smoothie", 600, 40, 60, 10),
 * new FoodItem("Steak & Asparagus", 1810, 5, 120, 95)));
 * }
 * 
 * cal.add(Calendar.DATE, -1); // Step back to the previous day
 * }
 * 
 * System.out.
 * println("✅ Seeding complete: Created 'fit_dev' with 30 days of history.");
 * };
 * }
 * 
 * // Helper method to keep the runner clean
 * private DailyLog createLog(String userId, Date date, FoodItem... items) {
 * DailyLog log = new DailyLog();
 * log.setUserId(userId);
 * log.setDate(date);
 * log.setFoodItems(Arrays.asList(items));
 * return log;
 * }
 * }
 */