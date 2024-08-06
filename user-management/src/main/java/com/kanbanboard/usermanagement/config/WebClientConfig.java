package com.kanbanboard.usermanagement.config;

import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;


import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
public class WebClientConfig {

    private final LoadBalancedExchangeFilterFunction filterFunction;

    @Bean
    public WebClient taskWebClient() {
        return WebClient.builder()
                .baseUrl("http://taskmanagement") // Service ID registered in Eureka
                .filter(filterFunction)
                .build();
    }

 
}
