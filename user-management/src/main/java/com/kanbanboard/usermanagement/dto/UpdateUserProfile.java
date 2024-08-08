package com.kanbanboard.usermanagement.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserProfile {


	@NotBlank(message =  "First name cannot be blank")
    @NonNull
	private String firstName;

	@NotBlank(message =  "Last name cannot be blank")
    @NonNull
	private String lastName;
    
}
