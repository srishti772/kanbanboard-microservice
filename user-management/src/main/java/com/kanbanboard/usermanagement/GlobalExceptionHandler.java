package com.kanbanboard.usermanagement;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.kanbanboard.usermanagement.exception.ErrorResponse;
import com.kanbanboard.usermanagement.exception.UserNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class) 
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex){
        ErrorResponse err = new ErrorResponse(Arrays.asList("Email or NUID is already registered"));
        return new ResponseEntity<>(err,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
        List<String> errors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((e)-> errors.add(e.getDefaultMessage()));
        return new ResponseEntity<>(new ErrorResponse(errors),HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex){
        ErrorResponse err = new ErrorResponse(Arrays.asList(ex.getMessage()));
        return new ResponseEntity<>(err,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex){
        ErrorResponse err = new ErrorResponse(Arrays.asList("Request body is missing or invalid"));
        return new ResponseEntity<>(err,HttpStatus.BAD_REQUEST);
    }

    
    
}
