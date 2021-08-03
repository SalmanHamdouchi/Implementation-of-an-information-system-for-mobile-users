package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Horraire;
import com.ijmfes.repositories.HorraireRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HorraireServiceImpl implements HorraireService {

    @Autowired
    HorraireRepository horraireRepository;

    @Override
    public Horraire find(String primaryKey) {
        return horraireRepository.findById(primaryKey).get();
    }

    @Override
    public List<Horraire> findAll() {
        
        return horraireRepository.findAll();
    }

    @Override
    public Horraire save(Horraire entity) {
        return horraireRepository.save(entity);
    }

    @Override
    public Boolean delete(String primaryKey) {
        Horraire horraire = horraireRepository.findById(primaryKey).orElse(null);
        if(horraire != null){
            horraireRepository.delete(horraire);
            return true;
        }
        return false;
    }

    @Override
    public Boolean update(Horraire entity) {
        return horraireRepository.save(entity) != null;
    }
    
}