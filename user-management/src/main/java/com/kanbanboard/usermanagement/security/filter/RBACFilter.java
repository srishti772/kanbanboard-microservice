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
import org.springframework.security.core.userdetails.UserDetails;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kanbanboard.usermanagement.dto.UserData;
import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.security.SecurityConstants;
import com.kanbanboard.usermanagement.service.AuthService;
import com.kanbanboard.usermanagement.service.UserService;
import com.kanbanboard.usermanagement.service.UserServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class RBACFilter extends OncePerRequestFilter{
    
    AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
               
                    String header = request.getHeader("Authorization");
        
                    if (header!=null && header.startsWith("Bearer ")) {
                        Authentication authentication = new UsernamePasswordAuthenticationToken( null,null, null);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        System.out.println("auth object set : " + SecurityContextHolder.getContext().getAuthentication());
                    }
                    filterChain.doFilter(request, response);


                   
    }
}
