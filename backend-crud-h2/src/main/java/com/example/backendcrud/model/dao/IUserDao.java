package com.example.backendcrud.model.dao;

import com.example.backendcrud.model.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface IUserDao extends CrudRepository<User, Long> {

    @Query("select u from User u Where u.id  = ?1")
    public User findById2(Long id);

}
