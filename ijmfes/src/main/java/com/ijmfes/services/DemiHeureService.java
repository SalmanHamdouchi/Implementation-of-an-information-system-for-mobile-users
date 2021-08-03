package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.DemiHeure;


public interface DemiHeureService {

    DemiHeure find(Integer primaryKey);
    List<DemiHeure> findAll();
    DemiHeure save(DemiHeure entity);
    Boolean delete(Integer primaryKey);
    Boolean update(DemiHeure entity);
}