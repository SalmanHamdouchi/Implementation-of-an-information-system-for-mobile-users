package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Matiere;
import com.ijmfes.models.LigneNvMatiere;
import com.ijmfes.repositories.MatiereRepository;
import com.ijmfes.repositories.NiveauMatiereRepository;
import com.ijmfes.repositories.NiveauRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NiveauMatiereServiceImpl implements NiveauMatiereService {

    @Autowired
    NiveauMatiereRepository niveauMatiereRepository;
    @Autowired
    MatiereRepository matiereRepository;
    @Autowired
    NiveauRepository niveauRepository;

    @Override
    public LigneNvMatiere find(String primaryKey) {
        return niveauMatiereRepository.findById(primaryKey).get();
    }

    @Override
    public List<LigneNvMatiere> findAll() {
        return niveauMatiereRepository.findAll();
    }

    @Override
    public LigneNvMatiere save(LigneNvMatiere entity) {
        return niveauMatiereRepository.save(entity);
    }

    @Override
    public int addNiveauxToMatiere(String matiereId,int niveaux) {
        Matiere matiere = matiereRepository.findById(matiereId).get();
        if(matiere != null){
            for(Long i = (long) 0; i < niveaux; i++) {
                LigneNvMatiere niveauMatiere = new LigneNvMatiere();
                String id = matiere.getNom()+""+i;
                niveauMatiere.setId(id);
                niveauMatiere.setMatiere(matiere);
                niveauMatiere.setNiveau(niveauRepository.findById(i).get());
                niveauMatiereRepository.save(niveauMatiere);
            }
            return matiere.getLigneNvMatieres().size();
        }
        return -1;
    }

    @Override
    public Boolean delete(String primaryKey) {
        LigneNvMatiere matiere = niveauMatiereRepository.findById(primaryKey).orElse(null);
        if(matiere != null){
            niveauMatiereRepository.delete(matiere);
            return true;
        }
        return false;
    }

    @Override
    public Boolean update(LigneNvMatiere entity) {
        return niveauMatiereRepository.save(entity) != null;
    }
    
}