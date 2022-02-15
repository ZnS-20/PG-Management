package com.example.PG.Management.Cook.Service;

import com.example.PG.Management.Cook.Entity.Orders;

import java.util.Date;
import java.util.List;

public interface CookService {

    List<Orders> getAllOrders(Date orderDate);

}
