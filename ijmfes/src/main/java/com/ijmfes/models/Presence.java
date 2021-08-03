package com.ijmfes.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ijmfes.models.Auditing.Auditable;

import javax.persistence.*;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Data
@Table(name = "presences")
// @EntityListeners(AuditingEntityListener.class)
public class Presence extends Auditable<String>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String remarque;

    private boolean absent;

    @ManyToOne()
    @JoinColumn(name="etudiant_id",nullable = false)
    private Etudiant etudiant;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name="seance_id",nullable = false)
    private Seance seance;

}