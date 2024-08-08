package com.kanbanboard.usermanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.repository.UserRepository;
import com.kanbanboard.usermanagement.service.UserService;

import lombok.AllArgsConstructor;



@SpringBootApplication
@EnableDiscoveryClient
@AllArgsConstructor
public class UserManagementApplication implements CommandLineRunner {

	UserRepository userRepository;
	public static void main(String[] args) {
		SpringApplication.run(UserManagementApplication.class, args);
	}


	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder(){
		return new BCryptPasswordEncoder();

		
	}

	@Override
	public void run(String... args) throws Exception {
		User adminUser = new User();
		adminUser.setNuid("0123");
		adminUser.setFirstName("Srishti");
		adminUser.setLastName("Ahirwar");
		adminUser.setEmail("ahirwar.s@northeastern.edu");
		adminUser.setPassword(new BCryptPasswordEncoder().encode("Uj721996!"));
		adminUser.setRoles("ROLE_ADMIN");

		userRepository.save(adminUser);	
	}

}
