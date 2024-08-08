package com.kanbanboard.usermanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kanbanboard.usermanagement.entity.User;


public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByNuid(String nuid);
    Optional<User> findByEmail(String email);
    void deleteById(Long id);
}