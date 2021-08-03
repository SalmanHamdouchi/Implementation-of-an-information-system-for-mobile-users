package com.ijmfes.services;

import java.util.ArrayList;
import java.util.List;

import com.ijmfes.models.Activite;
import com.ijmfes.models.Horraire;
import com.ijmfes.models.Seance;
import com.ijmfes.repositories.ActiviteRepository;
import com.ijmfes.repositories.ProfesseurRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActiviteServiceImpl implements ActiviteService {

    @Autowired
    private ActiviteRepository activiteRepository;
    @Autowired
    private ProfesseurRepository professeurRepository;
    @Autowired
    private UserService userService;

    @Override
    public Activite find(Long primaryKey) {
        Activite activite = activiteRepository.findById(primaryKey).get();
        return activite;
    }

    @Override
    public List<Activite> findAll() {
        List<Activite> activites = activiteRepository.findAll();
        return activites;
    }

    @Override
    public Activite save(Activite entity) {
        return activiteRepository.save(entity);
    }

    @Override
    public Boolean delete(Long primaryKey) {
        Activite activite = activiteRepository.findById(primaryKey).orElse(null);
        if (activite != null) {
            activiteRepository.delete(activite);
            return true;
        }
        return false;
    }

    @Override
    public Boolean update(Activite entity) {
        return activiteRepository.save(entity) != null;
    }

    public Boolean addSeance(Long activiteId, Seance seance) {
        Activite activite =  find(activiteId);
        
        if(activite != null){
            List<Seance> seances = activite.getSeances();
            seances.add(seance);
            activite.setSeances(seances);
            return true;
        }
        return false;
    }
    @Override
    public List<Seance> getSeances(Long primaryKey) {
        Activite activite = activiteRepository.findById(primaryKey).orElse(null);
        if (activite != null) {
            return activite.getSeances();
        }
        return null;
    }

    @Override
    public List<Activite> findAllByProfesseurId(String primaryKey) {

        List<Activite> activites = new ArrayList<Activite>();
        List<Horraire> horraires = professeurRepository.findById(userService.findUserByUsername(primaryKey).getProf().getCin()).get().getHorraires();
        horraires.forEach(horraire->{
            Activite activite = horraire.getActivite();
            if(!activites.contains(activite))
                activites.add(activite);
        });
        return activites;
    }

    
}