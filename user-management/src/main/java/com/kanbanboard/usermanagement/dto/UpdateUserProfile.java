package com.kanbanboard.usermanagement.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class UpdateUserProfile {
    @NotBlank(message =  "First name cannot be blank")
    @NonNull
	private String firstName;

	@NotBlank(message =  "Last name cannot be blank")
    @NonNull
	private String lastName;
    
}
