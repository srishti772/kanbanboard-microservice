package com.kanbanboard.usermanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import org.springframework.beans.factory.annotation.Value;

import com.kanbanboard.usermanagement.exception.ServiceUnavailableException;

import lombok.AllArgsConstructor;

@Configuration
public class WebClientConfig {

    
    @Value("${microservice.task-management}")
    private String taskManagementBaseUrl;

    @Bean
    public WebClient taskWebClient() {
       try{ return WebClient.builder()
                .baseUrl(taskManagementBaseUrl) // Service ID registered in Eureka
                .build(); }
        catch(Exception ex){
            throw ex;
        }
    }

 
}
