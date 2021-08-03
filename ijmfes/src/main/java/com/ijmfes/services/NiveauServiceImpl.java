package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Niveau;
import com.ijmfes.repositories.NiveauRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NiveauServiceImpl implements NiveauService {

    @Autowired
    NiveauRepository niveauRepository;

    @Override
    public Niveau find(Long primaryKey) {
        return niveauRepository.findById(primaryKey).get();
    }

    @Override
    public List<Niveau> findAll() {
        
        return niveauRepository.findAll();
    }

    @Override
    public Niveau save(Niveau entity) {
        return niveauRepository.save(entity);
    }

    @Override
    public Boolean delete(Long primaryKey) {
        Niveau niveau = niveauRepository.findById(primaryKey).orElse(null);
        if(niveau != null){
            niveauRepository.delete(niveau);
            return true;
        }
        return false;
    }

    @Override
    public Boolean update(Niveau entity) {
        return niveauRepository.save(entity) != null;
    }
    
}