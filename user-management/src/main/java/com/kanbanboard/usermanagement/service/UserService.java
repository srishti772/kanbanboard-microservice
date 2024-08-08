package com.kanbanboard.usermanagement.service;

import java.util.List;

import com.kanbanboard.usermanagement.dto.UpdateUserPassword;
import com.kanbanboard.usermanagement.dto.UpdateUserProfile;
import com.kanbanboard.usermanagement.dto.UserData;
import com.kanbanboard.usermanagement.entity.User;

import jakarta.validation.Valid;

public interface UserService {
    UserData saveUser(User user);
    UserData getUser(String nuid);
    User getUserByEmail(String email);
    List<UserData> getUsers();
    UserData updateUserProfile( String nuid, UpdateUserProfile user);
    UserData updateUserPassword( String nuid,  UpdateUserPassword user);
    UserData updateUser( String nuid, User user);
    void deleteUser( String nuid);
}
