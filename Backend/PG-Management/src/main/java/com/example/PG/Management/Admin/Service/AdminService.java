package com.example.PG.Management.Admin.Service;


import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.Admin.Entity.Users;
import com.example.PG.Management.Cook.Entity.Orders;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;

public interface AdminService {


    List<Users> fetchUsersList();

    ResponseEntity<String> addUser(Users user);

    ResponseEntity<String> deleteUser(Integer userId);

    boolean getUserById(int userId);

    ResponseEntity<String> updateUser(Users user);

    void addMenu(Menu menu);

    ResponseEntity<String> deleteMenuItem(int dataStoreId);

    ResponseEntity<String> updateMenuItem(Menu menu);

    boolean getMenuById(int dataStoreId);

    List<Orders> getUserOrders(Date finalDate, String userId, int whenOrder);
}
