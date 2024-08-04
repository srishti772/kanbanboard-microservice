package com.kanbanboard.usermanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.kanbanboard.usermanagement.repository.*;
import com.kanbanboard.usermanagement.dto.UpdateUserPassword;
import com.kanbanboard.usermanagement.dto.UpdateUserProfile;
import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.exception.UserNotFoundException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public User saveUser(User user){
        userRepository.save(user);
        return null;
    }
    public User getUser(String nuid){
         return UserServiceImpl.unwrapUser(userRepository.findByNuid(nuid), nuid);
    }

    public  List<User> getUsers(){
        List<User> result = (List<User>) userRepository.findAll();
        return result;
    }

    public User updateUserProfile(String nuid, UpdateUserProfile user){
        User updatedUser = unwrapUser(userRepository.findByNuid(nuid), nuid);
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        userRepository.save(updatedUser);
        return updatedUser;
    }

    public User updateUserPassword(String nuid, UpdateUserPassword user){
        User updatedUser = unwrapUser(userRepository.findByNuid(nuid), nuid);
        updatedUser.setPassword(user.getPassword());
        userRepository.save(updatedUser);
        return updatedUser;

    }

    public void deleteUser( String nuid){
        User user = getUser(nuid);
        userRepository.deleteById(user.getId());
    }

    static User unwrapUser(Optional<User> user , String nuid){
        if (user.isPresent()) return user.get();
        else throw new UserNotFoundException(nuid);
    }

}
