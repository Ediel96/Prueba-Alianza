package com.example.backendcrud.model.services;

import com.example.backendcrud.model.dao.IUserDao;
import com.example.backendcrud.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;



@Service
public class UsersServices  implements IUserServices{

    @Autowired
    private IUserDao iUserDao;
    @Override
    public List<User> findAll() {
        return (List<User>) iUserDao.findAll();
    }

    @Override
    public Optional<User> findByIdUser(Long id) {
        return iUserDao.findById(id);
    }

    @Override
    public User findById(Long id) {
        return iUserDao.findById2(id);
    }

    @Override
    public User save(User user) {
        return iUserDao.save(user);
    }

    @Override
    public void delete(Long id) {
        iUserDao.deleteById(id);
    }
}
