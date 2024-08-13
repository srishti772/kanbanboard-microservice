package com.kanbanboard.usermanagement.service;

import com.kanbanboard.usermanagement.dto.UserData;
import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.exception.UserNotFoundException;
import com.kanbanboard.usermanagement.security.SecurityConstants;


import lombok.AllArgsConstructor;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {

    private UserService userService;
        private final ObjectMapper objectMapper;


    public UserData validateToken(String token) {
        System.out.println("validating Token " + token);
        String actualToken = token.replace("Bearer ", "");

        String userEmail = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET_KEY))
                .build().verify(actualToken)
                .getSubject();
                System.out.println("token extracted email" + userEmail);


        
            User user = userService.getUserByEmail(userEmail);  
            return objectMapper.convertValue(user, UserData.class);          

      

    }

  
    public String generateToken(String userEmail, List<String> roles) {
      
           return JWT.create()
        .withSubject(userEmail)
        .withClaim("roles", roles)  // Add roles to token
        .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.TOKEN_EXPIRATION))
        .sign(Algorithm.HMAC512(SecurityConstants.SECRET_KEY));

    }


}
