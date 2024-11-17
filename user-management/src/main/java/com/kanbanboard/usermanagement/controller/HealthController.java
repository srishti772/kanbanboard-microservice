package com.kanbanboard.usermanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
public class HealthController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        try (Connection connection = dataSource.getConnection()) {
            if (connection.isValid(0)) {
                return new ResponseEntity<>("Database connection is healthy", HttpStatus.OK); 
            } else {
                return new ResponseEntity<>("Database connection is not valid", HttpStatus.SERVICE_UNAVAILABLE); 
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Database connection is not available: " + e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE); }
}
}
