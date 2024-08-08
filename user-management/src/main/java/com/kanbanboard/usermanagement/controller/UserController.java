package com.kanbanboard.usermanagement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kanbanboard.usermanagement.dto.UpdateUserPassword;
import com.kanbanboard.usermanagement.dto.UpdateUserProfile;
import com.kanbanboard.usermanagement.dto.UserData;
import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.exception.ServiceUnavailableException;
import com.kanbanboard.usermanagement.service.UserService;
import com.kanbanboard.usermanagement.service.UserServiceImpl;
import com.kanbanboard.usermanagement.service.TaskService;
import com.kanbanboard.usermanagement.entity.Task;


import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import reactor.core.publisher.Mono;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {


    public UserService userService;
    public TaskService taskService;

    @GetMapping("/{nuid}")
    public ResponseEntity<UserData> getUser(@PathVariable String nuid) {
        return new ResponseEntity<>(userService.getUser(nuid),HttpStatus.OK);
    }

     @GetMapping
    public ResponseEntity<List<UserData>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(),HttpStatus.OK);
    }
  

    @PostMapping
    public ResponseEntity<UserData> createUser(@Valid @RequestBody User user) {

        return new ResponseEntity<>(userService.saveUser(user),HttpStatus.CREATED);
    }

    @PutMapping("/profile/{nuid}")
    public ResponseEntity<UserData> updateUser(@PathVariable String nuid, @Valid @RequestBody UpdateUserProfile user) {
        return new ResponseEntity<>(userService.updateUserProfile(nuid, user),HttpStatus.OK);
    }
    
    @PutMapping("/password/{nuid}")
    public ResponseEntity<UserData> updateUserPassword(@PathVariable String nuid, @Valid @RequestBody UpdateUserPassword user) {
        return new ResponseEntity<>(userService.updateUserPassword(nuid, user),HttpStatus.OK);
    }
    @PutMapping("/{nuid}")
    public ResponseEntity<UserData> updateUser(@PathVariable String nuid, @Valid @RequestBody User user) {
        return new ResponseEntity<>(userService.updateUser(nuid, user),HttpStatus.OK);
    }
    
    @DeleteMapping("/{nuid}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable String nuid) {
      
            userService.deleteUser(nuid);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            }

    @GetMapping("/{userId}/tasks")
    public Mono<List<Task>> getTasksByUserId(@PathVariable String userId) {
       return taskService.getTasksByUserId(userId);
        
    }

    
}
