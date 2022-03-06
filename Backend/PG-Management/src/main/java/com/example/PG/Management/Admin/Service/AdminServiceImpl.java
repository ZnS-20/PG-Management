package com.example.PG.Management.Admin.Service;

import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.Admin.Entity.Users;
import com.example.PG.Management.Admin.Repository.UsersRepository;
import com.example.PG.Management.Cook.Entity.Orders;
import com.example.PG.Management.Cook.Repository.OrdersInterface;
import com.example.PG.Management.User.Repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private OrdersInterface ordersInterface;

    @Override
    public List<Users> fetchUsersList() {
        return (List<Users>) usersRepository.findAll();
    }

    @Override
    public ResponseEntity<String> addUser(Users user) {
        try{
            usersRepository.save(user);
            return ResponseEntity.ok("Successfully Inserted");
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Cannot Insert Record");
        }
    }

    @Override
    public ResponseEntity<String> deleteUser(Integer userId) {
        try{
            List<Orders> orders = ordersInterface.findByUserId_UserId(userId);
            ordersInterface.deleteAll(orders);
            usersRepository.deleteById(userId);
            return ResponseEntity.ok("Succesfully Deleted");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Delete Failed: User not Present");
        }
    }

    @Override
    public boolean getUserById(int userId) {
        Optional<Users> user =  usersRepository.findById(userId);
        if(user == null || !user.isPresent())
            return false;
        return true;
    }

    @Override
    public ResponseEntity<String> updateUser(Users user) {
        try{
            usersRepository.save(user);
            return ResponseEntity.ok("Successfully Updated");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Cannot Update User");
        }
    }

    @Override
    public void addMenu(Menu menu) {
        menuRepository.save(menu);
    }

    @Override
    public ResponseEntity<String> deleteMenuItem(int dataStoreId) {
        try{
            List<Orders> orders = ordersInterface.findByMenu_Id(dataStoreId);
            for(Orders order: orders){
                ordersInterface.delete(order);
            }
            menuRepository.deleteById(dataStoreId);
            return ResponseEntity.ok("Item Deleted Successfully");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Id Not Present: "+dataStoreId);
        }
    }

    @Override
    public ResponseEntity<String> updateMenuItem(Menu menu) {
        try {
            menuRepository.save(menu);
            return ResponseEntity.ok("Menu Successfully Updated");
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Update Cannot be performed for id: "+menu.getId());
        }
    }

    @Override
    public boolean getMenuById(int dataStoreId) {
        Optional<Menu> menu = menuRepository.findById(dataStoreId);
        return (menu == null || !menu.isPresent())?false:true;
    }

    @Override
    public List<Orders> getUserOrders(Date finalDate, String userId, int whenOrder) {
        List<Orders> orders = ordersInterface.findByOrderDateAndWhenOrderAndUserId_UserId(finalDate,Integer.valueOf(whenOrder),Integer.parseInt(userId));
        return orders;
    }

}
