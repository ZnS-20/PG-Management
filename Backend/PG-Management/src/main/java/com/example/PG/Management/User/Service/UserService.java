package com.example.PG.Management.User.Service;

import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.Admin.Entity.Users;
import com.example.PG.Management.Cook.Entity.Orders;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    List<Menu> getMenu();

    ResponseEntity<String> orderFood(Orders order);

    ResponseEntity<Users> login(String username, String password);

    ResponseEntity<List<Menu>> getMenuByCategory(String category);
}