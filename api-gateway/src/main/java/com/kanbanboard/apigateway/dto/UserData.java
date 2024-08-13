package com.kanbanboard.apigateway.dto;

import java.util.List;

public class UserData{
     private String email;
    private String roles;

    public UserData() {
    }


    public UserData(String email, String roles) {
        this.email = email;
        this.roles = roles;
    }

     // Getters and setters
     public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
