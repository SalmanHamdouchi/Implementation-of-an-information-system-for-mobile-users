package com.ijmfes.models;

import java.util.Date;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.Email;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "etudiants")
// @EntityListeners(AuditingEntityListener.class)
public class Etudiant extends Auditable<String>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private int numero;
    private String nom;
    private String prenom;
    private String nomArabe;
    private String prenomArabe;
    private Date dateNaissance;
    private String adresse;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date dateInscription;
    private String tele1;
    private String tele2;
    private String photo;
    
    @JsonIgnoreProperties({"etudiants","hibernateLazyInitializer","handler"})
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="type_id")
    private Type type;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "etudiant")
    private List<Paiment> paiments;

    @JsonIgnore
    @OneToMany(mappedBy = "etudiant",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Presence>presences;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "etudiant")
    private List<Note> notes;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                CascadeType.PERSIST,
                CascadeType.MERGE
            })
    @JoinTable(name = "groupe_etudiant",
            joinColumns = { @JoinColumn(name = "etudiant_id") },
            inverseJoinColumns = { @JoinColumn(name = "groupe_id") })
    private List<Groupe> activitiesGrp;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "etudiant")
    private List<Individu> activitiesInd;

    @JsonIgnore
    @OneToOne(mappedBy = "etudiant",cascade = CascadeType.ALL)
    private User user;

}