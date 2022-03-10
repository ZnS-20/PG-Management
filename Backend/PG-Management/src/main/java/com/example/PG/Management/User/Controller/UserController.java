package com.example.PG.Management.User.Controller;


import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.Admin.Entity.Users;
import com.example.PG.Management.Cook.Entity.Orders;
import com.example.PG.Management.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@RestController
public class UserController {

    @Autowired
    private UserService userService;


    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<Users> login(@RequestParam String username, String password){
        if(username == null)
            return new ResponseEntity<>(new Users(), HttpStatus.BAD_REQUEST);
        return userService.login(username, password);
    }

    @RequestMapping(value = "/getMenu", method = RequestMethod.GET)
    List<Menu> getMenu(){
        return (List<Menu>) userService.getMenu();
    }

    @RequestMapping(value = "/orderFood", method = RequestMethod.POST)
    public ResponseEntity<String> orderFood(@RequestBody List<Orders> order){
        //Save login state in React state.
        if(order == null)
            return ResponseEntity.badRequest().body("Invalid Order: EMPTY");
        return userService.orderFood(order);
    }

    @RequestMapping(value = "/getMenuByCategory", method = RequestMethod.GET)
    public ResponseEntity<List<Menu>> getMenuByCategory(@RequestParam String category){
        if(category== null)
            return ResponseEntity.badRequest().body(new ArrayList<>());
        return userService.getMenuByCategory(category);
    }

    @RequestMapping(value = "/getOrdersByUserIdAndDate", method = RequestMethod.GET)
    public ResponseEntity<List<Orders>> getOrdersByUserIdAndDate(@RequestParam Integer userId, @RequestParam String date){
        if(userId == null || date ==null)
            return ResponseEntity.badRequest().body(new ArrayList<Orders>());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy", Locale.ENGLISH);
        LocalDate formattedDate = LocalDate.parse(date, formatter);
        Date finalDate = Date.from(formattedDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return userService.getOrdersByUserIdAndDate(userId,finalDate);
    }

    @RequestMapping(value = "/getOrdersByUserId", method = RequestMethod.GET)
    public ResponseEntity<List<Orders>> getOrdersByUserId(@RequestParam Integer userId){
        if(userId == null)
            return ResponseEntity.badRequest().body(new ArrayList<Orders>());
        return userService.getOrdersByUserId(userId);
    }



}
