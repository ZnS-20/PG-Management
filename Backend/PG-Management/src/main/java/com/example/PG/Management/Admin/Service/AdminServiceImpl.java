package com.example.PG.Management.Admin.Service;

import com.example.PG.Management.Admin.Entity.Users;
import com.example.PG.Management.Admin.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public List<Users> fetchUsersList() {
        return (List<Users>) usersRepository.findAll();
    }
}
