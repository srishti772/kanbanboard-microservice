package com.kanbanboard.usermanagement.dto;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.Data;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserData {
    
	private long id;
	private String nuid;
	private String firstName;
	private String lastName;
	private String email;
    private String roles;

	

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", nuid='" + getNuid() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", roles='" + getRoles() + "'" +

            "}";
    }

}
