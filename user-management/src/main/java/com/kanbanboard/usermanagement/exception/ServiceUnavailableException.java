package com.kanbanboard.usermanagement.exception;

public class ServiceUnavailableException extends RuntimeException {
    public ServiceUnavailableException(String name){
        super("No instance of Service running : "+name);
    }
}


