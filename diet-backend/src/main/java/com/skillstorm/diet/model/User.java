package com.skillstorm.diet.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Document(collection = "users")
public class User extends BaseEntity {
    private String userName;
    private String email;
    private String password;
    private String dietType; // e.g., Keto, Vegan, Paleo
    private double proteinTarget;
    private double carbTarget;
    private double fatTarget;
    private double calorieTarget;

}
