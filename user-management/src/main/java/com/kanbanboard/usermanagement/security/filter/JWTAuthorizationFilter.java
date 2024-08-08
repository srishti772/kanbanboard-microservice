package com.kanbanboard.usermanagement.security.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.security.SecurityConstants;
import com.kanbanboard.usermanagement.service.UserService;
import com.kanbanboard.usermanagement.service.UserServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class JWTAuthorizationFilter extends OncePerRequestFilter{
    
    UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                String header = request.getHeader(SecurityConstants.AUTHORIZATION);
                      
                if(header == null || !header.startsWith(SecurityConstants.BEARER)){
                    filterChain.doFilter(request, response); //if user hasn't been authenticated no need to check token
                    return;
                }
                String token = header.replace(SecurityConstants.BEARER, "");
                    
                   
                    
                    String userEmail = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET_KEY))
                    .build().verify(token)
                    .getSubject();


                    User user = userService.getUserByEmail(userEmail);
                    if (user != null) {
                     List<GrantedAuthority> authorities = Arrays.stream(user.getRoles().split(","))
                     .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

        Authentication authentication = new UsernamePasswordAuthenticationToken(userEmail, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);

    }
}
