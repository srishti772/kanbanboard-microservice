package com.kanbanboard.usermanagement.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotBlank;

import com.kanbanboard.usermanagement.validator.email;

import jakarta.persistence.Column;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class User {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank(message =  "NUID cannot be blank")
	@NonNull
	@Column(nullable = false, unique = true)
	private String nuid;
	
	@NotBlank(message =  "First name cannot be blank")
    @NonNull
	@Column(nullable = false)
	private String firstName;

	@NotBlank(message =  "Last name cannot be blank")
    @NonNull
	@Column(nullable = false)
	private String lastName;

    @NotBlank(message =  "email cannot be blank")
	@NonNull
	@Column(nullable = false, unique = true)
	@email
	private String email;

	@NotBlank(message =  "Password cannot be blank")
    @NonNull
	@Column(nullable = false)
	private String password;

	

	@Override
	public String toString() {
		return "{" +
			" id='" + getId() + "'" +
			", nuid='" + getNuid() + "'" +
			", firstName='" + getFirstName() + "'" +
			", lastName='" + getLastName() + "'" +
			", email='" + getEmail() + "'" +
			", password='" + getPassword() + "'" +
			"}";
	}


}