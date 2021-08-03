package com.ijmfes.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ijmfes.models.Auditing.Auditable;

import java.util.List;

import javax.persistence.*;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "lignenvmatiere")
// @EntityListeners(AuditingEntityListener.class)
public class LigneNvMatiere extends Auditable<String>{
    
    @Id
    @Column(name = "id", nullable = false,unique = true)
    private String id;
    
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER,
            cascade = {
                CascadeType.PERSIST,
                CascadeType.MERGE
            })
    @JoinTable(name = "lignenvmatiere_prof",
            joinColumns = { @JoinColumn(name = "ligneNvMatiere_id") },
            inverseJoinColumns = { @JoinColumn(name = "prof_id") })
    private List<Professeur> profs;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="matiere_id",nullable = false)
    private Matiere matiere;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="niveau_id",nullable = false)
    private Niveau niveau;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "ligneNvMatiere")
    private List<Exam> exams;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "ligneNvMatiere")
    private List<Activite> activites;
}