package com.ijmfes.models;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "professeurs")
// @EntityListeners(AuditingEntityListener.class)
public class Professeur extends Auditable<String>  {
    
    @Id
    @Column(name = "cin", nullable = false,unique = true)
    private String cin;
    private String nom;
    private String prenom;
    private String diplomes;
    private Date dateNaissance;
    private String tele;
    private String email;
    
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    },
    mappedBy = "profs")
    List<LigneNvMatiere> ligneNvMatieres;
    
    @JsonIgnore
    @OneToMany(mappedBy = "prof",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    List<Horraire> horraires;

    @JsonIgnore
    @OneToOne(mappedBy = "prof",cascade = CascadeType.ALL)
    private User user;
}