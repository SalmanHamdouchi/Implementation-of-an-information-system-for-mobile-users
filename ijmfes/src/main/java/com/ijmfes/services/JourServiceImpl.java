package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Jour;
import com.ijmfes.repositories.JourRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JourServiceImpl implements JourService {

    @Autowired
    JourRepository jourRepository;

    @Override
    public Jour find(String primaryKey) {
        return jourRepository.findById(primaryKey).get();
    }

    @Override
    public List<Jour> findAll() {
        
        return jourRepository.findAll();
    }

    @Override
    public Jour save(Jour entity) {
        return jourRepository.save(entity);
    }

    @Override
    public Boolean delete(String primaryKey) {
        Jour jour = jourRepository.findById(primaryKey).orElse(null);
        if(jour != null){
            jourRepository.delete(jour);
            return true;
        }
        return false;
    }

    @Override
    public Boolean update(Jour entity) {
        return jourRepository.save(entity) != null;
    }
    
}