package com.example.PG.Management.User.Controller;


import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.Admin.Entity.Users;
import com.example.PG.Management.Cook.Entity.Orders;
import com.example.PG.Management.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
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
    public ResponseEntity<String> orderFood(Orders order){
        //Save login state in React state.
        if(order == null)
            return ResponseEntity.badRequest().body("Invalid Order: EMPTY");
        return userService.orderFood(order);
    }


}
