package com.example.PG.Management.Admin.Repository;

import com.example.PG.Management.Admin.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users,Long> {
}
