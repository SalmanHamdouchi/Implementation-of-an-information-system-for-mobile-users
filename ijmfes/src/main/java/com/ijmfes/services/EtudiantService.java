package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Activite;
import com.ijmfes.models.Etudiant;

public interface EtudiantService {

    Etudiant find(Long primaryKey);
    List<Etudiant> findAll();
    List<Etudiant> findEtudiantByActivite(Long id);
    List<Activite> findAllActivite(String id);
    Etudiant save(Etudiant entity);
    Boolean delete(Long primaryKey);
    Boolean update(Etudiant entity);
}