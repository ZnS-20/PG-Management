package com.example.PG.Management.User.Service;

import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.User.Repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private MenuRepository userRepository;

    @Override
    public List<Menu> getMenu() {
        return (List<Menu>) userRepository.findAll();
    }
}
