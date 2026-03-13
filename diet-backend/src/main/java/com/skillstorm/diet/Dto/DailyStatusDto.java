package com.skillstorm.diet.Dto;

import java.util.Map;

import lombok.Data;

@Data
public class DailyStatusDto {
    private String userId;
    private String date;
    private Map<String, Double> consumedMacros;
    private Map<String, Double> targets;
    private String feedback;
}
