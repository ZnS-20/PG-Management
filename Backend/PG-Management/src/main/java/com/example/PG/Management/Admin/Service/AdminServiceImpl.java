package com.example.PG.Management.Admin.Service;

import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.Admin.Entity.Users;
import com.example.PG.Management.Admin.Repository.UsersRepository;
import com.example.PG.Management.User.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Users> fetchUsersList() {
        return (List<Users>) usersRepository.findAll();
    }

    @Override
    public void addMenu(Menu menu) {
        userRepository.save(menu);
    }
}
