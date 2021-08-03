package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Niveau;

public interface NiveauService {

    Niveau find(Long primaryKey);
    List<Niveau> findAll();
    Niveau save(Niveau entity);
    Boolean delete(Long primaryKey);
    Boolean update(Niveau entity);
}