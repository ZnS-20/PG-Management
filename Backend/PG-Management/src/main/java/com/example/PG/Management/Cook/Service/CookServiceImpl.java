package com.example.PG.Management.Cook.Service;

import com.example.PG.Management.Cook.Entity.Orders;
import com.example.PG.Management.Cook.Repository.OrdersInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class CookServiceImpl implements CookService{

    @Autowired
    private OrdersInterface ordersInterface;

    @Override
    public List<Orders> getAllOrders(Date orderDate, int whenOrder) {
        List<Orders> orders = ordersInterface.findByOrderDateAndWhenOrder(orderDate,Integer.valueOf(whenOrder));
        HashMap<Integer,Orders> tempHashMap = new HashMap<>();
        for (Orders order: orders){
            int key = order.getMenu().getId();
            if(!tempHashMap.containsKey(key))
                tempHashMap.put(key,order);
            else{
                order.setQuantity(order.getQuantity()+tempHashMap.get(key).getQuantity());
                tempHashMap.put(key,order);
            }
        }
        orders = new ArrayList<>(tempHashMap.values());
        tempHashMap.clear();
        return orders;
    }

    @Override
    public List<Orders> getOrdersByDate(Date finalDate) {
        List<Orders> orders = ordersInterface.findByOrderDate(finalDate);
        return orders;
    }
}
