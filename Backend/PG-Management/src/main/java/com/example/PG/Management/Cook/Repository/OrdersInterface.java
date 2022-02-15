package com.example.PG.Management.Cook.Repository;

import com.example.PG.Management.Cook.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface OrdersInterface extends JpaRepository<Orders,Long> {

    @Query("select o from Orders o where o.orderDate = :orderDate")
    List<Orders> findOrdersByDate(@Param("orderDate")Date orderDate);

}
