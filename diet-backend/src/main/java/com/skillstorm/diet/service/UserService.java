package com.skillstorm.diet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.skillstorm.diet.Dto.UserDto;
import com.skillstorm.diet.model.User;
import com.skillstorm.diet.repository.UserRepo;

@Service
public class UserService {

    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public boolean login(String userName, String password) {
        User user = findByUserName(userName);
        if (user == null) {
            return false;
        }
        // In production, use hashed passwords
        return user.getPassword().equals(password);
    }

    public User findByUserName(String userName) {
        return userRepo.findByUserName(userName).orElse(null);
    }

    public User createUser(User user) {
        if (userRepo.findByUserName(user.getUserName()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        User createdUser = userRepo.save(user);
        return createdUser;
    }

    public UserDto getUser(String id) {

        User user = userRepo.findByPublicId(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        UserDto userDto = new UserDto();
        userDto.setUserName(user.getUserName());
        userDto.setEmail(user.getEmail());
        userDto.setPublicID(user.getPublicId());
        return userDto;
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepo.findAll();
        List<UserDto> userDtos = users.stream().map(user -> {
            UserDto userDto = new UserDto();
            userDto.setUserName(user.getUserName());
            userDto.setEmail(user.getEmail());
            userDto.setPublicID(user.getPublicId());
            return userDto;
        }).collect(Collectors.toList());
        return userDtos;
    }

    public void deleteUser(String id) {
        User user = userRepo.findByPublicId(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        userRepo.delete(user);

    }

    public UserDto update(String id, UserDto user) {

        User updatedUser = userRepo.findByPublicId(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        updatedUser.setUserName(user.getUserName());
        updatedUser.setEmail(user.getEmail());
        User savedUser = userRepo.save(updatedUser);
        UserDto userDto = new UserDto();
        userDto.setUserName(savedUser.getUserName());
        userDto.setEmail(savedUser.getEmail());
        userDto.setPublicID(savedUser.getPublicId());
        return userDto;
    }

}
