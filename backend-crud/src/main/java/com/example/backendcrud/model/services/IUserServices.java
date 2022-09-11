package com.example.backendcrud.model.services;

import com.example.backendcrud.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IUserServices {

    public List<User> findAll();


    public Optional<User> findByIdUser(Long id);

    public User findById(Long id);

    public User save (User user);

    public void delete (Long id);
}
