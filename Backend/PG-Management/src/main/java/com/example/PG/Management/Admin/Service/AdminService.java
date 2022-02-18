package com.example.PG.Management.Admin.Service;


import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.Admin.Entity.Users;

import java.util.List;

public interface AdminService {


    List<Users> fetchUsersList();

    void addMenu(Menu menu);
}
