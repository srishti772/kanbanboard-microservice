package com.kanbanboard.usermanagement.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;
import com.kanbanboard.usermanagement.security.filter.AuthenticationFilter;
import com.kanbanboard.usermanagement.security.filter.ExceptionHandlerFilter;
import com.kanbanboard.usermanagement.security.filter.RBACFilter;
import com.kanbanboard.usermanagement.security.manager.CustomAuthenticationManager;
import com.kanbanboard.usermanagement.service.AuthService;
import com.kanbanboard.usermanagement.service.UserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
public class SecurityConfig {

    private CustomAuthenticationManager authenticationManager;
    private UserService userService;
    private AuthService authService;

    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
       
     
    AuthenticationFilter authFilter = new AuthenticationFilter(authenticationManager, authService);

    authFilter.setFilterProcessesUrl("/auth/login");  

         http
         .headers().frameOptions().disable()
        .and()
        .csrf(csrf -> csrf.disable())        
        .authorizeHttpRequests(authorizeRequests -> authorizeRequests
            .requestMatchers("/h2/**").permitAll()
            .requestMatchers("/auth/login", "/auth/register", "/auth/validate", "/health", "/actuator/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .addFilterBefore(new ExceptionHandlerFilter(), AuthenticationFilter.class)
            .addFilter(authFilter))
            .addFilterAfter(new RBACFilter(authService), AuthenticationFilter.class)        
            .sessionManagement(sessionManagement -> 
            sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();

    }
}
