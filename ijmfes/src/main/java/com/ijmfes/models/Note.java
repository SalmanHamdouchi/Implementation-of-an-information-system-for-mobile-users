package com.ijmfes.models;

import javax.persistence.*;

import com.ijmfes.models.Auditing.Auditable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "notes")
// @EntityListeners(AuditingEntityListener.class)
public class Note extends Auditable<String> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String decision;
    private String note;
    private String remarque;

    @ManyToOne()
    @JoinColumn(name="etudiant_id",nullable = false)
    private Etudiant etudiant;
    @ManyToOne()
    @JoinColumn(name="exam_id",nullable = false)
    private Exam exam;
    
}