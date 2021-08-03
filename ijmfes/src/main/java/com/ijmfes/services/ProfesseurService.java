package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Activite;
import com.ijmfes.models.Horraire;
import com.ijmfes.models.Professeur;

public interface ProfesseurService {

    Professeur find(String primaryKey);
    List<Professeur> findAll();
    Professeur save(Professeur entity);
    Boolean delete(String primaryKey);
    Boolean update(Professeur entity);
    String addHorraire(Horraire horraire, String professeurID);
    String removeHorraire(String horraireID, String professeurID);
    String addNiveauMatiere(String niveauMatiereID, String professeurID);
    String removeNiveauMatiere(String niveauMatiereID, String professeurID);
    List<Activite> getActivities(Professeur entity);
}