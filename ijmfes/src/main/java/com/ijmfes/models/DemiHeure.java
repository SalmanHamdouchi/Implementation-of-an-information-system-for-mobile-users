package com.ijmfes.models;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "demiheures")
// @EntityListeners(AuditingEntityListener.class)
public class DemiHeure extends Auditable<String> {
    @Id
    @Column(name = "nom", nullable = false,unique = true)
    private String nom;
    
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "demiHeure")
    List<Horraire> horraires;
}