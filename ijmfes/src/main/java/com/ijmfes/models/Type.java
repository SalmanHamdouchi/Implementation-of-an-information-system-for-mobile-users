package com.ijmfes.models;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.ijmfes.models.Auditing.Auditable;
import lombok.Data;

@Entity
@Data
@Table(name = "type")
public class Type extends Auditable<String> {

    @Id
    @Column(name = "nom", nullable = false,unique = true)
    String nom;
    
    @JsonIgnore
    @OneToMany(mappedBy = "type",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    List<Etudiant> etudiants;
}