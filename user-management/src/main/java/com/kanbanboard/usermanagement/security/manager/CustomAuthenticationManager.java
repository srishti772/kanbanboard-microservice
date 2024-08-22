package com.kanbanboard.usermanagement.security.manager;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kanbanboard.usermanagement.dto.UserData;
import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.service.UserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Component
public class CustomAuthenticationManager implements AuthenticationManager{
private UserService userService;
private final ObjectMapper objectMapper;

private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
       User user =  userService.getUserByEmail(authentication.getName()); 
       if(!bCryptPasswordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())){
        throw new BadCredentialsException("Invalid Credentials - Password");
       }
       List<GrantedAuthority> authorities =null;
       if (user != null) {
       authorities = Arrays.stream(user.getRoles().split(","))
        .map(SimpleGrantedAuthority::new)
       .collect(Collectors.toList());
       }
       UserData userData = objectMapper.convertValue(user, UserData.class);


       return new UsernamePasswordAuthenticationToken(userData, null, authorities);

    

    
}
}
