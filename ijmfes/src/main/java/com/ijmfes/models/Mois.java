package com.ijmfes.models;

import java.util.List;

import javax.persistence.*;

import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "mois")
// @EntityListeners(AuditingEntityListener.class)
public class Mois extends Auditable<String>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom", nullable = false)
    private String nom;
    
    @ManyToOne()
    @JoinColumn(name="annee_id",nullable = false)
    private Annee annee;

    @ManyToMany(mappedBy = "mois")
    List<Paiment> paiments;
}