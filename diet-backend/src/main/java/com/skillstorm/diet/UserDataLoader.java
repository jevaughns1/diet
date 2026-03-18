/*
 * package com.skillstorm.diet;
 * 
 * import java.util.Arrays;
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
 * import com.skillstorm.diet.repository.DietRepo;
 * import com.skillstorm.diet.repository.UserRepo;
 * 
 * @Configuration
 * public class UserDataLoader {
 * 
 * @Bean
 * CommandLineRunner loadSampleUser(UserRepo userRepo, DailyLogRepo
 * dailyLogRepo, DietRepo dietRepo) {
 * return args -> {
 * 
 * // Create User
 * User user = new User();
 * user.setUserName("sampr");
 * user.setEmail("samplr@example.com");
 * user.setPassword("password123");
 * user.setDietType("Keto Diet");
 * user.setProteinTarget(120);
 * user.setCarbTarget(50);
 * user.setFatTarget(80);
 * user.setCalorieTarget(2000);
 * userRepo.save(user);
 * 
 * // Create DailyLog
 * DailyLog log = new DailyLog();
 * log.setUserId(user.getPublicId());
 * log.setDate(new Date());
 * log.setFoodItems(Arrays.asList(
 * new FoodItem("Grilled Chicken Breast", 165, 0, 31, 3.6),
 * new FoodItem("Avocado", 240, 12, 3, 22)));
 * dailyLogRepo.save(log);
 * };
 * }
 * }
 * 
 * 
 */