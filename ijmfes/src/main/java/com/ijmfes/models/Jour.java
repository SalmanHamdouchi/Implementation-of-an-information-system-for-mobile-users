package com.ijmfes.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ijmfes.models.Auditing.Auditable;

import java.util.List;

import javax.persistence.*;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Entity
@Data
@Table(name = "jours")
// @EntityListeners(AuditingEntityListener.class)
public class Jour extends Auditable<String>{
    @Id
    @Column(name = "nom", nullable = false,unique = true)
    private String nom;

    @JsonIgnore
    @OneToMany(mappedBy = "jour",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    List<Horraire> horraires;
}