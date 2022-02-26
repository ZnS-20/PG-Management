package com.example.PG.Management.Admin.Controller;

import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.Admin.Entity.Users;
import com.example.PG.Management.Admin.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {

    @Autowired

    private AdminService adminService;

    @RequestMapping(value = "/getUserList", method = RequestMethod.GET)
    List<Users> getAllUsers(){
        return adminService.fetchUsersList();
    }


    @RequestMapping(value = "/addUser", method = RequestMethod.POST, consumes="application/json")
    public ResponseEntity<String> addUser(@RequestBody Users user){
        ResponseEntity<String> responseEntity = null;
        if(user == null)
            return ResponseEntity.badRequest().body("Invalid Request");
        responseEntity = adminService.addUser(user);
        return responseEntity;
    }

    @RequestMapping(value = "/deleteUser", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteUser(@RequestParam Integer userId){
        ResponseEntity<String> responseEntity = null;
        if(userId == null)
            return ResponseEntity.badRequest().body("No user id Provided");
        responseEntity = adminService.deleteUser(userId);
        return responseEntity;
    }

    @RequestMapping(value = "/updateUser", method = RequestMethod.PUT)
    public ResponseEntity<String> updateUser(@RequestBody Users user){
        ResponseEntity<String> responseEntity = null;
        if(!adminService.getUserById(user.getUserId()))
            return ResponseEntity.badRequest().body("Invalid Update Request");
        responseEntity = adminService.updateUser(user);
        return responseEntity;
    }

    @RequestMapping(value = "/addMenu", method = RequestMethod.POST, consumes = "application/json")
    void addMenu(@RequestBody Menu menu){
        adminService.addMenu(menu);
    }

    @RequestMapping(value = "/deleteMenuItem", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteMenuItem(@RequestParam Integer dataStoreId){
        if(dataStoreId == null)
            return ResponseEntity.badRequest().body("Please Provide Menu Id");
        return adminService.deleteMenuItem(dataStoreId);
    }

    @RequestMapping(value = "/updateMenuItem", method = RequestMethod.PUT)
    public ResponseEntity<String> updateMenuItem(@RequestBody Menu menu){
        ResponseEntity<String> responseEntity = null;
        if(!adminService.getMenuById(menu.getId()))
            return ResponseEntity.badRequest().body("Invalid Update Request");
        responseEntity = adminService.updateMenuItem(menu);
        return responseEntity;
    }


}
