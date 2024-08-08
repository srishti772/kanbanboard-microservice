package com.kanbanboard.usermanagement.security.filter;

import java.io.IOException;

import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.kanbanboard.usermanagement.exception.UserNotFoundException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ExceptionHandlerFilter extends OncePerRequestFilter{

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try{
            filterChain.doFilter(request,response);
        }catch(UserNotFoundException ex){
            response.setStatus( HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write(ex.getMessage());   
            response.getWriter().flush();
            }
            catch(JWTVerificationException ex){
                response.setStatus( HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Invalid JWT");   
                response.getWriter().flush();
                }
        catch(RuntimeException ex){
            response.setStatus( HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(ex.getMessage());   
            response.getWriter().flush();
            }
        catch(Exception ex){
            response.setStatus( HttpServletResponse.SC_BAD_GATEWAY);
            }
    }
    
    
}
