package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.LigneNvMatiere;

public interface NiveauMatiereService {

    LigneNvMatiere find(String primaryKey);
    List<LigneNvMatiere> findAll();
    LigneNvMatiere save(LigneNvMatiere entity);
    Boolean delete(String primaryKey);
    Boolean update(LigneNvMatiere entity);
    int addNiveauxToMatiere(String matiereId,int niveaux);
}