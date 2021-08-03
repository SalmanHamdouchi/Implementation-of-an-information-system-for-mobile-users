package com.ijmfes.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@DiscriminatorValue( value="individu" )
public class Individu extends Activite{
    
    @ManyToOne()
    @JoinColumn(name="etudiant_id")
    private Etudiant etudiant;

    public Individu() {
    }

    public Individu(@NotNull String nom, @NotNull String description,@NotNull TypeEtudiant typeEtudiant) {
        super(nom, description, typeEtudiant);
    }
 
}