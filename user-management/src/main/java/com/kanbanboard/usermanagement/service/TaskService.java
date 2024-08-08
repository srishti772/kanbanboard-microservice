package com.kanbanboard.usermanagement.service;

import com.kanbanboard.usermanagement.entity.Task;
import com.kanbanboard.usermanagement.exception.ServiceUnavailableException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class TaskService {

 @Autowired
    private WebClient taskWebClient;

    public Mono<List<Task>> getTasksByUserId(String userId) {
       try{ return taskWebClient
                .get()
                .uri("api/tasks/user/{userId}", userId)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Task>>() {});
       }catch(WebClientResponseException ex){
                    throw new ServiceUnavailableException("Task Management");
                }
    }
}
