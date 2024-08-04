package com.kanbanboard.usermanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kanbanboard.usermanagement.entity.User;


public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByNuid(String nuid);
    void deleteById(Long id);
}