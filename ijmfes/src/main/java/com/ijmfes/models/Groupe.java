package com.ijmfes.models;

import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@EqualsAndHashCode(callSuper=true)
@Data
@DiscriminatorValue( value="groupe" )
public class Groupe extends Activite{
    
    @ManyToMany(mappedBy = "activitiesGrp")
    private List<Etudiant> etudiants;


    public Groupe() {
    }

    public Groupe(@NotNull String nom, @NotNull String description,@NotNull TypeEtudiant typeEtudiant) {
        super(nom,description, typeEtudiant);
    }

}