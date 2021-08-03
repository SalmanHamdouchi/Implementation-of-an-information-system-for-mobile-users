package com.ijmfes.services;

import java.util.List;
import com.ijmfes.models.Activite;
import com.ijmfes.models.Seance;

public interface ActiviteService {
    Activite find(Long primaryKey);
    List<Activite> findAllByProfesseurId(String primaryKey);
    List<Activite> findAll();
    Activite save(Activite entity);
    Boolean delete(Long primaryKey);
    Boolean update(Activite entity);
    List<Seance> getSeances(Long  primaryKey);
    Boolean addSeance(Long activiteId, Seance seance);
}