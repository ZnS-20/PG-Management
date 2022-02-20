package com.example.PG.Management.Admin.Repository;

import com.example.PG.Management.Admin.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsersRepository extends JpaRepository<Users,Integer> {

    Users findByPhoneNumber(@Param("phoneNumber") Long phone);

    Users findByEmail(@Param("email") String username);
}
