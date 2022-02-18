package com.example.PG.Management.Admin.Repository;

import com.example.PG.Management.Admin.Entity.Users;
import com.example.PG.Management.Admin.Repository.customInterface.CustomMenuRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users,Long>, CustomMenuRepository {


}
