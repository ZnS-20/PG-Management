package com.example.PG.Management.Cook.Repository;


import com.example.PG.Management.Cook.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrdersInterface extends JpaRepository<Orders,Integer> {

    List<Orders> findByOrderDateAndWhenOrder(@Param("orderDate")Date orderDate, @Param("whenOrder")Integer whenOrder);

    List<Orders> findByOrderDateAndWhenOrderAndUserId_UserId(@Param("orderDate")Date orderDate, @Param("whenOrder")Integer whenOrder, @Param("userId")int userId);

    List<Orders> findByMenu_Id(int dataStoreId);

    List<Orders> findByUserId_UserId(int userId);

    List<Orders> findByUserId_UserIdOrderByOrderDateDesc(int userId);

    List<Orders> findByOrderDateAndUserId_UserId(@Param("orderDate")Date orderDate, @Param("userId")int userId);

    List<Orders> findByOrderDate(@Param("orderDate") Date orderDate);
}
