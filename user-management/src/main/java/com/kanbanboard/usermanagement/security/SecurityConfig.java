package com.kanbanboard.usermanagement.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;
import com.kanbanboard.usermanagement.security.filter.AuthenticationFilter;
import com.kanbanboard.usermanagement.security.filter.ExceptionHandlerFilter;
import com.kanbanboard.usermanagement.security.filter.JWTAuthorizationFilter;
import com.kanbanboard.usermanagement.security.manager.CustomAuthenticationManager;
import com.kanbanboard.usermanagement.service.UserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
public class SecurityConfig {

    private CustomAuthenticationManager authenticationManager;
    private UserService userService;

    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
       
     
    AuthenticationFilter authFilter = new AuthenticationFilter(authenticationManager);
    authFilter.setFilterProcessesUrl("/authenticate");  

         http
         .headers().frameOptions().disable()
        .and()
        .csrf(csrf -> csrf.disable())        
        .authorizeHttpRequests(authorizeRequests -> authorizeRequests
            .requestMatchers("/h2/**").permitAll()
            .requestMatchers(HttpMethod.POST, SecurityConstants.REGISTER_PATH).permitAll()

            .requestMatchers(HttpMethod.GET, SecurityConstants.GET_USER_PATH).hasAnyRole("USER", "ADMIN")
            .requestMatchers(HttpMethod.GET, SecurityConstants.GET_TASKS).hasAnyRole("USER", "ADMIN")

            .requestMatchers(HttpMethod.GET, SecurityConstants.UPDATE_USER_PATH).hasRole("ADMIN")
            .requestMatchers(HttpMethod.PUT, SecurityConstants.GET_USERS_PATH).hasRole("ADMIN")
            .requestMatchers(HttpMethod.DELETE).hasRole("ADMIN")
            
            .requestMatchers(HttpMethod.PUT,SecurityConstants.UPDATE_USER_PROFILE_PATH).hasRole("USER")
            .requestMatchers(HttpMethod.PUT,SecurityConstants.UPDATE_USER_PASSWORD_PATH).hasRole("USER")

            .anyRequest().authenticated()
            .and()
            .addFilterBefore(new ExceptionHandlerFilter(), AuthenticationFilter.class)
            .addFilter(authFilter))
            .addFilterAfter(new JWTAuthorizationFilter(userService), AuthenticationFilter.class)

            
        .sessionManagement(sessionManagement -> 
            sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();

    }
}
