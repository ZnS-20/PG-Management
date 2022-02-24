package com.example.PG.Management.Cook.Controller;
import com.example.PG.Management.Cook.Entity.Orders;
import com.example.PG.Management.Cook.Service.CookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@RestController
public class CookController {

    @Autowired
    private CookService cookService;

    @GetMapping("/getOrders")
    public List<Orders> getOrders(@RequestParam String date,@RequestParam int whenOrder){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy", Locale.ENGLISH);
        LocalDate formattedDate = LocalDate.parse(date, formatter);
        Date finalDate = Date.from(formattedDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return cookService.getAllOrders(finalDate,whenOrder);
    }

}
