package com.skillstorm.diet.Dto;

import lombok.Data;

@Data
public class UserDto {

    private String userName;

    private String email;

    private String publicID;
    private double proteinTarget;
    private double carbTarget;
    private double fatTarget;
    private double calorieTarget;

}
