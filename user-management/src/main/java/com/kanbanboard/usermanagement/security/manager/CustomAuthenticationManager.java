package com.kanbanboard.usermanagement.security.manager;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.service.UserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class CustomAuthenticationManager implements AuthenticationManager{
private UserService userService;
private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
       User user =  userService.getUserByEmail(authentication.getName()); 
       if(!bCryptPasswordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())){
        throw new BadCredentialsException("Invalid Credentials - Password");
       }
       return new UsernamePasswordAuthenticationToken(authentication.getName(), user.getPassword());

    }

    
}
