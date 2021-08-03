package com.ijmfes.models;

import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "activites")
// @EntityListeners(AuditingEntityListener.class)
@Inheritance( strategy = InheritanceType.SINGLE_TABLE )
@DiscriminatorColumn( name = "type" )
public abstract class Activite{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String description;

    @OneToMany(mappedBy = "activite",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Seance> seances;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "activite")
    private List<Seance> paiments;

    @ManyToOne()
    @JoinColumn(name="ligneNvMatiere_id")
    private LigneNvMatiere ligneNvMatiere;

    @ManyToOne()
    @JoinColumn(name="salle_id")
    private Salle salle;

    @OneToMany(mappedBy = "activite",cascade = CascadeType.PERSIST)
    private List<Horraire> horraires;

    @JoinColumn(name="typeEtudiant_id")
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private TypeEtudiant typeEtudiant;

    public Activite() {
    }

    public Activite(@NotNull String nom, @NotNull String description,@NotNull TypeEtudiant typeEtudiant) {
        this.nom = nom;
        this.description = description;
        this.typeEtudiant = typeEtudiant;
    }
}