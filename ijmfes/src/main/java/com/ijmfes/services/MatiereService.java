package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Matiere;

public interface MatiereService {

    Matiere find(String primaryKey);
    List<Matiere> findAll();
    Matiere save(Matiere entity);
    byte[] getImage(String matiereNom);
    Boolean delete(String primaryKey);
    Boolean update(Matiere entity);
}