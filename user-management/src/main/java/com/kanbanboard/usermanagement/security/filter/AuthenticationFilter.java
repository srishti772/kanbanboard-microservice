package com.kanbanboard.usermanagement.security.filter;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.security.SecurityConstants;
import com.kanbanboard.usermanagement.security.manager.CustomAuthenticationManager;
import com.kanbanboard.usermanagement.service.AuthService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter{
    

    private CustomAuthenticationManager authenticationManager;
    private AuthService authService;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        try { 
            User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
            Authentication authenticationObject = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
            return authenticationManager.authenticate(authenticationObject);
        }
        catch(IOException ex){
            throw new RuntimeException("Invalid fields"); //throwing exception from inside of a filter
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
       
                  List<String> roles = authResult.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList()
            );

        String token = authService.generateToken(authResult.getName(),roles);
        response.addHeader(SecurityConstants.AUTHORIZATION, SecurityConstants.BEARER + token);
    }


    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
                response.setStatus( HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write(failed.getMessage());   
                response.getWriter().flush();
    }

}
