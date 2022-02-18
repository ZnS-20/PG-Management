package com.example.PG.Management.Admin.Entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "menu")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dataStoreId;
    private String item;
    private String portion;
    private int sxPoints;
    @ManyToOne
    private FoodCategory category;
}
