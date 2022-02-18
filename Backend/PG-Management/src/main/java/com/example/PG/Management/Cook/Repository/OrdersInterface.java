package com.example.PG.Management.Cook.Repository;

import com.example.PG.Management.Cook.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrdersInterface extends JpaRepository<Orders,Long> {

    @Query("select o from Orders o")
    List<Object> findOrdersByDate(@Param("orderDate")Date orderDate, @Param("whenOrder")Integer whenOrder);

}
