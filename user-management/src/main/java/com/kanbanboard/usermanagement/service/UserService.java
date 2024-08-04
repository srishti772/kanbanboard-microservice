package com.kanbanboard.usermanagement.service;

import java.util.List;

import com.kanbanboard.usermanagement.dto.UpdateUserPassword;
import com.kanbanboard.usermanagement.dto.UpdateUserProfile;
import com.kanbanboard.usermanagement.entity.User;

public interface UserService {
    User saveUser(User user);
    User getUser(String nuid);
    List<User> getUsers();
    User updateUserProfile( String nuid, UpdateUserProfile user);
    User updateUserPassword( String nuid, UpdateUserPassword user);
    void deleteUser( String nuid);
}
