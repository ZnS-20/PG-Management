package com.example.PG.Management.User.Service;

import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.Admin.Entity.Users;
import com.example.PG.Management.Admin.Repository.UsersRepository;
import com.example.PG.Management.Cook.Entity.Orders;
import com.example.PG.Management.Cook.Repository.OrdersInterface;
import com.example.PG.Management.User.Repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private OrdersInterface ordersInterface;

    @Override
    public List<Menu> getMenu() {
        return (List<Menu>) menuRepository.findAll();
    }

    @Override
    public ResponseEntity<String> orderFood(List<Orders> orders) {

        try {
            ordersInterface.saveAll(orders);
            return ResponseEntity.ok("Order Successfully placed");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<Users> login(String username, String password) {
        try {
            if (username.matches("[0-9]+")) {
                Users user = usersRepository.findByPhoneNumber(Long.parseLong(username));
                if (user.getPassword().equals(password) && user.getPassword().length() == password.length()) {
                    return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
                }
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else if (username.matches("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")) {
                Users user = usersRepository.findByEmail(username);
                if (user.getPassword().equals(password) && user.getPassword().length() == password.length()) {
                    return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
                }
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new Users(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<List<Menu>> getMenuByCategory(String category) {
        List<Menu> menu = menuRepository.findByCategory_Category(category);
        return ResponseEntity.ok(menu);
    }

    @Override
    public ResponseEntity<List<Orders>> getOrdersByUserIdAndDate(Integer userId, Date finalDate) {
        try {
            List<Orders> orders = ordersInterface.findByOrderDateAndUserId_UserId(finalDate,userId);
            return ResponseEntity.ok(orders);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }

    @Override
    public ResponseEntity<List<Orders>> getOrdersByUserId(Integer userId) {
        try {
            List<Orders> orders = ordersInterface.findByUserId_UserIdOrderByOrderDateDesc(userId);
            return ResponseEntity.ok(orders);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }
}
