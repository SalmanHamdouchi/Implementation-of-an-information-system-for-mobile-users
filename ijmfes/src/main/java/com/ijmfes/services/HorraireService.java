package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Horraire;

public interface HorraireService {

    Horraire find(String primaryKey);
    List<Horraire> findAll();
    Horraire save(Horraire entity);
    Boolean delete(String primaryKey);
    Boolean update(Horraire entity);
}