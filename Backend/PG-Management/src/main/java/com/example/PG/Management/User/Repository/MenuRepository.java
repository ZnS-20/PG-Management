package com.example.PG.Management.User.Repository;

import com.example.PG.Management.Admin.Entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu,Integer> {

    List<Menu> findAll();

    List<Menu> findByCategory_Category(@Param("category") String category);


}
