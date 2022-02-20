package com.example.PG.Management.User.Repository;

import com.example.PG.Management.Admin.Entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu,Integer> {

    List<Menu> findAll();


}
