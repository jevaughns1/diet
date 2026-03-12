/*
 * package com.skillstorm.diet;
 * 
 * import java.util.Arrays;
 * 
 * import org.springframework.boot.CommandLineRunner;
 * import org.springframework.context.annotation.Bean;
 * import org.springframework.context.annotation.Configuration;
 * 
 * import com.skillstorm.diet.model.Diet;
 * import com.skillstorm.diet.model.FoodItem;
 * import com.skillstorm.diet.repository.DietRepo;
 * 
 * @Configuration
 * public class SampleDataLoader {
 * 
 * @Bean
 * CommandLineRunner loadSampleDiets(DietRepo dietRepo) {
 * return args -> {
 * Diet keto = new Diet();
 * keto.setName("Keto Diet");
 * keto.setDescription("Low carb, high fat diet");
 * keto.setFoodItems(Arrays.asList(
 * new FoodItem("Grilled Chicken Breast", 165, 0, 31, 3.6),
 * new FoodItem("Avocado", 240, 12, 3, 22),
 * new FoodItem("Olive Oil", 119, 0, 0, 14)));
 * 
 * Diet vegetarian = new Diet();
 * vegetarian.setName("Vegetarian Diet");
 * vegetarian.setDescription("Plant-based diet");
 * vegetarian.setFoodItems(Arrays.asList(
 * new FoodItem("Lentils", 230, 40, 18, 0.8),
 * new FoodItem("Brown Rice", 216, 45, 5, 1.8),
 * new FoodItem("Broccoli", 55, 11, 4, 0.5)));
 * 
 * Diet lowCarb = new Diet();
 * lowCarb.setName("Low Carb Diet");
 * lowCarb.setDescription("Diet with reduced carbs");
 * lowCarb.setFoodItems(Arrays.asList(
 * new FoodItem("Salmon", 206, 0, 22, 12),
 * new FoodItem("Eggs", 78, 0.6, 6, 5),
 * new FoodItem("Spinach", 23, 3.6, 2.9, 0.4)));
 * 
 * dietRepo.saveAll(Arrays.asList(keto, vegetarian, lowCarb));
 * };
 * }
 * }
 * 
 * 
 * 
 * 
 */