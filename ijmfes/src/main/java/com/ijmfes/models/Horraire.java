package com.ijmfes.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ijmfes.models.Auditing.Auditable;

import javax.persistence.*;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "horraires")
// @EntityListeners(AuditingEntityListener.class)
public class Horraire extends Auditable<String>{
    @Id
    @Column(name = "id", nullable = false,unique = true)
    private String id;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name="prof_id")
    private Professeur prof;

    @ManyToOne()
    @JoinColumn(name="demiHeure_id",nullable = false)
    private DemiHeure demiHeure;
    
    @ManyToOne()
    @JoinColumn(name="jour_id",nullable = false)
    private Jour jour;
    
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name="activite_id")
    Activite activite;
}