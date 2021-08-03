package com.ijmfes.models;

import java.util.List;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "matieres")
// @EntityListeners(AuditingEntityListener.class)
public class Matiere extends Auditable<String>{
    @Id
    @Column(name = "nom", nullable = false,unique = true)
    private String nom;
    @Column(name = "photo", length = 1000)
	private String photo;
    private String description;
    private float prixAdult;
    private float prixEnfant;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "matiere")
    List<LigneNvMatiere> ligneNvMatieres;
    
}