package com.skillstorm.diet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class DietApplication {

	public static void main(String[] args) {
		SpringApplication.run(DietApplication.class, args);
	}

}
