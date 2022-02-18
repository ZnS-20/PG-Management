package com.example.PG.Management.User.Controller;


import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getMenu")
    List<Menu> getMenu(){
        return (List<Menu>) userService.getMenu();
    }

}
