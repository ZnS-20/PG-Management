package com.example.PG.Management.Cook.Entity;

import com.example.PG.Management.Admin.Entity.Menu;
import com.example.PG.Management.Admin.Entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne
    private Menu menu;
    @Column(name = "orderDate")
    private Date orderDate;
    @OneToOne
    @JoinColumn(name = "userId")
    private Users userId;
    @Column(name = "whenOrder")
    private Integer whenOrder;
    @Column(name = "quantity")
    private int quantity;
}
