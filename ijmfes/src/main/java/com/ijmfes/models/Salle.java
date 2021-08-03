package com.ijmfes.models;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "salles")
// @EntityListeners(AuditingEntityListener.class)
public class Salle extends Auditable<String> {
    @Id
    @Column(name = "nom", nullable = false,unique = true)
    private String nom;    
    @JsonIgnore
    @OneToMany(mappedBy = "salle")
    List<Activite> activites;
}