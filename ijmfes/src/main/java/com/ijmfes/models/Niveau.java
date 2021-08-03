package com.ijmfes.models;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "niveaux")
// @EntityListeners(AuditingEntityListener.class)
public class Niveau  extends Auditable<String>{

    @Id
    @Column(name = "nv", nullable = false,unique = true)
    private int nv;

    @JsonIgnore
    @OneToMany(mappedBy = "niveau",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    List<LigneNvMatiere> ligneNvMatieres;
}