package com.kanbanboard.usermanagement.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String nuid){
        super("No such user with NUID - "+nuid);
    }
    
}
