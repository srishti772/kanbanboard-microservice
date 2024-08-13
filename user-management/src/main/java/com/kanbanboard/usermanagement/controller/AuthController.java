package com.kanbanboard.usermanagement.controller;

import com.kanbanboard.usermanagement.dto.UserData;
import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.service.AuthService;
import com.kanbanboard.usermanagement.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

   
    private AuthService authService;
    public UserService userService;


    @GetMapping("/validate")
    public ResponseEntity<UserData> validateToken(@RequestHeader("Authorization") String token) {
       
        return new ResponseEntity<>(authService.validateToken(token),HttpStatus.OK);
   
       
    }

     @PostMapping("/register")
    public ResponseEntity<UserData> createUser(@Valid @RequestBody User user) {

        return new ResponseEntity<>(userService.saveUser(user),HttpStatus.CREATED);
    }


}
