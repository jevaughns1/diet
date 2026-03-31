package com.skillstorm.diet.model;

import org.springframework.data.mongodb.core.index.CompoundIndex;
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
@CompoundIndex(name = "provider_providerId_unique", def = "{'provider': 1, 'providerId': 1}", unique = true)
@Document(collection = "users")
public class User extends BaseEntity {

    private String providerId;
    private String userName;
    private String email;
    private String firstName;
    private String lastName;

    private String password;
    private String dietType; // e.g., Keto, Vegan, Paleo
    private double proteinTarget;
    private double carbTarget;
    private double fatTarget;
    private double calorieTarget;
    private boolean enabled;
    private UserRole role;
    private String avatarUrl;

    public enum UserRole {
        GUEST,
        ADMIN,
        MANAGER
    }

    public enum Provider {
        GOOGLE

    }

}
