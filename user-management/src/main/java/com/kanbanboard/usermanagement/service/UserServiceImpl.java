package com.kanbanboard.usermanagement.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.kanbanboard.usermanagement.repository.*;

import jakarta.validation.Valid;

import com.kanbanboard.usermanagement.dto.UpdateUserPassword;
import com.kanbanboard.usermanagement.dto.UpdateUserProfile;
import com.kanbanboard.usermanagement.entity.User;
import com.kanbanboard.usermanagement.exception.UserNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kanbanboard.usermanagement.dto.UserData;




import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private BCryptPasswordEncoder bcryptPasswordEncoder;
    private final ObjectMapper objectMapper;


    private UserRepository userRepository;

    public UserData saveUser(User user) {
        logger.info("Saving user: {}", user);
        user.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles("ROLE_USER");
        
        User savedUser = userRepository.save(user);
        UserData userData = objectMapper.convertValue(savedUser, UserData.class);

        return userData;
    }

    public UserData getUser(String nuid) {
        logger.info("Fetching user with NUID: {}", nuid);
        User fetchedUser = UserServiceImpl.unwrapUser(userRepository.findByNuid(nuid), nuid);
        UserData userData = objectMapper.convertValue(fetchedUser, UserData.class);
        return userData;
    }

    public User getUserByEmail(String email) {
        logger.info("Fetching user with email: {}", email);
        User fetchedUser = UserServiceImpl.unwrapUser(userRepository.findByEmail(email), email);
        return fetchedUser;
    }

    public List<UserData> getUsers() {
        logger.info("Fetching all users");
        List<User> users = (List<User>) userRepository.findAll();
         return users.stream()
                    .map(user -> objectMapper.convertValue(user, UserData.class))
                    .collect(Collectors.toList());
    }

    public UserData updateUserProfile(String nuid, UpdateUserProfile user) {
        logger.info("Updating profile for user with NUID: {}", nuid);
        User updatedUser = unwrapUser(userRepository.findByNuid(nuid), nuid);
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser = userRepository.save(updatedUser);
        UserData userData = objectMapper.convertValue(updatedUser, UserData.class);

        return userData;
    }

    public UserData updateUser( String nuid, User user){
        logger.info("Updating user with NUID: {}", nuid);
        User updatedUser = unwrapUser(userRepository.findByNuid(nuid), nuid);
        updatedUser.setFirstName(user.getFirstName());
        updatedUser.setLastName(user.getLastName());
        updatedUser.setRoles(user.getRoles());
        updatedUser.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
        updatedUser.setEmail(user.getEmail());
        updatedUser.setNuid(user.getNuid());
        updatedUser = userRepository.save(updatedUser);
        UserData userData = objectMapper.convertValue(updatedUser, UserData.class);

        return userData;
    }


    public UserData updateUserPassword(String nuid, UpdateUserPassword user) {
        logger.info("Updating password for user with NUID: {}", nuid);
        User updatedUser = unwrapUser(userRepository.findByNuid(nuid), nuid);
        updatedUser.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
        updatedUser = userRepository.save(updatedUser);
        UserData userData = objectMapper.convertValue(updatedUser, UserData.class);

        return userData;
    }

    public void deleteUser(String nuid) {
        logger.info("Deleting user with NUID: {}", nuid);
        UserData user = getUser(nuid);
        userRepository.deleteById(user.getId());
    }

    static User unwrapUser(Optional<User> user, String nuid) {
        if (user.isPresent()) return user.get();
        else throw new UserNotFoundException(nuid);
    }
    
}
