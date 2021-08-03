package com.ijmfes.services;

import java.util.ArrayList;
import java.util.List;

import com.ijmfes.models.Activite;
import com.ijmfes.models.Etudiant;
import com.ijmfes.repositories.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ijmfes.models.Groupe;
import com.ijmfes.repositories.ActiviteRepository;
import com.ijmfes.repositories.GroupeRepository;
import com.ijmfes.repositories.IndividuRepository;

@Service
public class EtudiantServiceImpl implements EtudiantService {

    @Autowired
    private EtudiantRepository repository;
    @Autowired
    GroupeRepository groupeRepository;
    @Autowired
    IndividuRepository individuRepository;
    @Autowired
    ActiviteRepository activiteRepository;
    @Autowired
    private UserService userService;

    @Override
    public Etudiant find(Long primaryKey) {
        Etudiant etudiant = repository.findById(primaryKey).get();
        return etudiant;
    }

    @Override
    public List<Etudiant> findAll() {
        List<Etudiant> etudiants = (List<Etudiant>) repository.findAll();
        return etudiants;
    }

    @Override
    public Etudiant save(Etudiant entity) {
        return repository.save(entity);
    }

    @Override
    public Boolean delete(Long id) {

        Etudiant etudiant  = repository.findById(id).orElse(null);
        if(etudiant != null) {
            repository.delete(etudiant);
            return true;
        }
        return false;
       
    }

    @Override
    public Boolean update(Etudiant entity){
       return repository.save(entity) != null;
    }

    @Override
    public List<Etudiant> findEtudiantByActivite(Long id) {
        List<Etudiant> eList=new ArrayList<>();
        Activite activite=activiteRepository.findById(id).get();
        if (activite instanceof Groupe){
            eList =  groupeRepository.findFirstById(id).getEtudiants();
        }else{
            eList.add(individuRepository.findFirstById(id).getEtudiant());      
        }
        return eList;
    }

    @Override
    public List<Activite> findAllActivite(String id) {
        Etudiant etudiant = find(userService.findUserByUsername(id).getEtudiant().getId());
        List<Activite> activites = new ArrayList<>();
        activites.addAll(etudiant.getActivitiesGrp());
        activites.addAll(etudiant.getActivitiesInd());
        return activites;
    }
}