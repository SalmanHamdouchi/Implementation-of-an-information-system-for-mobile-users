package com.ijmfes.models;

import java.util.List;

import javax.persistence.*;

import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "annees")
// @EntityListeners(AuditingEntityListener.class)
public class Annee extends Auditable<String>  {
    @Id
    @Column(name = "nom", nullable = false,unique = true)
    private String nom;
    @OneToMany(mappedBy = "annee",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Mois> mois;
    @OneToMany(mappedBy = "annee",fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    private List<Exam> examens;
}
