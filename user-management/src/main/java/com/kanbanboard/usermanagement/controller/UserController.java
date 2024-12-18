package com.kanbanboard.usermanagement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.kanbanboard.usermanagement.dto.UserData;

import com.kanbanboard.usermanagement.dto.UpdateUserPassword;
import com.kanbanboard.usermanagement.dto.UpdateUserProfile;
import com.kanbanboard.usermanagement.dto.UserData;
import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.exception.ServiceUnavailableException;
import com.kanbanboard.usermanagement.exception.UserNotFoundException;
import com.kanbanboard.usermanagement.service.UserService;
import com.kanbanboard.usermanagement.service.UserServiceImpl;
import com.kanbanboard.usermanagement.service.TaskService;
import com.kanbanboard.usermanagement.entity.Task;
import com.kanbanboard.usermanagement.service.AuthService;

import org.springframework.web.bind.annotation.RequestHeader;

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
    public AuthService authService;

    @GetMapping("/{nuid}")
    public ResponseEntity<UserData> getUser(@PathVariable String nuid) {
        return new ResponseEntity<>(userService.getUser(nuid),HttpStatus.OK);
    }

    @GetMapping("/verify/{email}")
    public ResponseEntity<String> getUserByEmail(@PathVariable String email) {
        return new ResponseEntity<>(userService.getUserByEmail(email).getNuid(),HttpStatus.OK);
    }

     @GetMapping
    public ResponseEntity<List<UserData>> getUsers() {
        System.out.println("inside get all users**");
        return new ResponseEntity<>(userService.getUsers(),HttpStatus.OK);
    }
  
    @GetMapping("/self")
    public ResponseEntity<UserData>  getUserSelf(@RequestHeader("Authorization") String token) {
        UserData currUser = authService.validateToken(token);
        return new ResponseEntity<>(userService.getUser(currUser.getNuid()),HttpStatus.OK);
    }
   
    @PutMapping("/self/profile")
    public ResponseEntity<UserData> updateUser(@Valid @RequestBody UpdateUserProfile user, @RequestHeader("Authorization") String token) {
        UserData currUser = authService.validateToken(token);
        return new ResponseEntity<>(userService.updateUserProfile(currUser.getNuid(), user),HttpStatus.OK);
    }
    
    @PutMapping("/self/password")
    public ResponseEntity<UserData> updateUserPassword(@Valid @RequestBody UpdateUserPassword user, @RequestHeader("Authorization") String token) {
        UserData currUser = authService.validateToken(token);
        return new ResponseEntity<>(userService.updateUserPassword(currUser.getNuid(), user),HttpStatus.OK);
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
    public ResponseEntity<List<Task>> getTasksByUserId(@PathVariable String userId) {
        List<Task> tasks = taskService.getTasksByUserId(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);


        }
    
}
