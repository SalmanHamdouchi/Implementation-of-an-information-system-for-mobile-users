package com.ijmfes.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import javax.servlet.ServletContext;

import com.ijmfes.models.Matiere;
import com.ijmfes.repositories.MatiereRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MatiereServiceImpl implements MatiereService {

    @Autowired
    MatiereRepository matiereRepository;

    @Autowired
    ServletContext context;

    @Override
    public Matiere find(String primaryKey) {
        Matiere matiere = matiereRepository.findById(primaryKey).get();
        return matiere;
    }

    @Override
    public List<Matiere> findAll() {
        return matiereRepository.findAll();
    }

    @Override
    public Matiere save(Matiere entity) {
        return matiereRepository.save(entity);
    }

    @Override
    public byte[] getImage(String nom) {
        Matiere matiere   = matiereRepository.findById(nom).get();
        try {
            return Files.readAllBytes(Paths.get(context.getRealPath("/Images/")+matiere.getPhoto()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Boolean delete(String primaryKey) {
        Matiere matiere = matiereRepository.findById(primaryKey).orElse(null);
        if(matiere != null){
            Boolean[] d = {true}; 
            matiere.getLigneNvMatieres().forEach(nm ->{
                if(nm.getActivites().size()!=0){
                    d[0]=false;
                }
            });
            if(d[0]){
                matiereRepository.delete(matiere);
                return true;
            }
        }
        return false;
    }

    @Override
    public Boolean update(Matiere entity) {
        return matiereRepository.save(entity) != null;
    }
}