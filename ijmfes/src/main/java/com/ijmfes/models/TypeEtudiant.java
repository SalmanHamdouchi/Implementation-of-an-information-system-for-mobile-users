package com.ijmfes.models;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.ijmfes.models.Auditing.Auditable;
import lombok.Data;

@Entity
@Data
@Table(name = "typeetudiant")
public class TypeEtudiant extends Auditable<String> {

    @Id
    @Column(name = "nom", nullable = false,unique = true)
    String nom;
    
    @JsonIgnore
    @OneToMany(mappedBy = "typeEtudiant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Activite> activites;
}