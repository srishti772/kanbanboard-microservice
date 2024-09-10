package com.kanban.notificationmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableDiscoveryClient
public class NotificationmanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotificationmanagementApplication.class, args);
	}

}
