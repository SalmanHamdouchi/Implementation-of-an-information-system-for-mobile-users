package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.DemiHeure;
import com.ijmfes.repositories.DemiHeureRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DemiHeureServiceImpl implements DemiHeureService {

    @Autowired
    DemiHeureRepository demiHeureRepository;

    @Override
    public DemiHeure find(Integer primaryKey) {
        return demiHeureRepository.findById(primaryKey.toString()).get();
    }

    @Override
    public List<DemiHeure> findAll() {
        
        return demiHeureRepository.findAll();
    }

    @Override
    public DemiHeure save(DemiHeure entity) {
        return demiHeureRepository.save(entity);
    }

    @Override
    public Boolean delete(Integer primaryKey) {
        DemiHeure demiHeure = find(primaryKey);
        if(demiHeure != null){
            demiHeureRepository.delete(demiHeure);
            return true;
        }
        return false;
    }

    @Override
    public Boolean update(DemiHeure entity) {
        return demiHeureRepository.save(entity) != null;
    }
    
}