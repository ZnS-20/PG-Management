package com.example.PG.Management.Cook.Service;

import com.example.PG.Management.Cook.Entity.Orders;
import com.example.PG.Management.Cook.Repository.OrdersInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CookServiceImpl implements CookService{

    @Autowired
    private OrdersInterface ordersInterface;

    @Override
    public List<Orders> getAllOrders(Date orderDate) {
        return (List<Orders>) ordersInterface.findOrdersByDate(orderDate);
    }
}
