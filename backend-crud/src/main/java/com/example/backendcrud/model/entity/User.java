package com.example.backendcrud.model.entity;


import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shared_key")
    private String sharedKey;

    @Column(name = "business_id")
    private String businessId;

    @Column
    private String email;

    @Column
    private String phone;

    @Column(name = "date_start")
    private Date dateStart;

    @Column(name = "date_end")
    private Date dateEnd;

}
