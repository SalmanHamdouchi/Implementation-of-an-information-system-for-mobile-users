package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Jour;

public interface JourService {

    Jour find(String primaryKey);
    List<Jour> findAll();
    Jour save(Jour entity);
    Boolean delete(String primaryKey);
    Boolean update(Jour entity);
}