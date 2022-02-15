package com.example.PG.Management.Cook.Entity;

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
    @Column(name = "itemName")
    private String itemName;
    @Column(name = "portion")
    private String portion;
    @Column(name = "orderDate")
    private Date orderDate;
    @ManyToOne
    @JoinColumn(name = "userId")
    private Users userId;
}
