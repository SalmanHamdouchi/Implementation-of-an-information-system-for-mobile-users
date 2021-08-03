package com.ijmfes.models;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "paiments")
public class Paiment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float montantPayee;
    private float montantRestant;
    private Date datePaiment;
    private String description;

    @ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinTable(name="paiment_mois",joinColumns=@JoinColumn(name="paiment_id"),inverseJoinColumns=@JoinColumn(name="mois_id"))
    private List<Mois> mois;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Etudiant etudiant;
    
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Activite activite;
}