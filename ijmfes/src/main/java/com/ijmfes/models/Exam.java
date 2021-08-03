package com.ijmfes.models;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Table(name = "examens")
// @EntityListeners(AuditingEntityListener.class)
@Data
public class Exam extends Auditable<String> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String file;

    @ManyToOne()
    @JoinColumn(name="annee_id",nullable = false)
    private Annee annee;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "exam")
    private List<Note> notes;
    
    @ManyToOne()
    @JoinColumn(name="ligneNvMatiere_id",nullable = false)
    private LigneNvMatiere ligneNvMatiere;
}
