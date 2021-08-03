package com.ijmfes.services;

import java.util.ArrayList;
import java.util.List;

import com.ijmfes.models.Activite;
import com.ijmfes.models.Etudiant;
import com.ijmfes.models.Groupe;
import com.ijmfes.models.Individu;
import com.ijmfes.models.Presence;
import com.ijmfes.models.Seance;
import com.ijmfes.repositories.ActiviteRepository;
import com.ijmfes.repositories.GroupeRepository;
import com.ijmfes.repositories.IndividuRepository;
import com.ijmfes.repositories.PresenceRepository;
import com.ijmfes.repositories.SeanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeanceServiceImpl implements SeanceService {

    @Autowired
    SeanceRepository seanceRepository;
    @Autowired
    ActiviteRepository activiteRepository;
    @Autowired
    GroupeRepository groupeRepository;
    @Autowired
    IndividuRepository individuRepository;
    @Autowired
    PresenceRepository presenceRepository;

    public Seance find(Long id) {
        return seanceRepository.findById(id).get();
    }

    @Override
    public Seance findAvecPresence(Long id) {
        List<Presence> presences=new ArrayList<>();
        List<Etudiant> eList=new ArrayList<>();
        Seance seance = seanceRepository.findById(id).get();
        if(seance.getPresences().isEmpty()){
            Activite activite=seance.getActivite();
            if (activite instanceof Groupe){
                eList =  groupeRepository.findFirstById(activite.getId()).getEtudiants();
            }else{
                eList.add(individuRepository.findFirstById(activite.getId()).getEtudiant());
            }
            eList.forEach(action->{
                Presence presence = new Presence();
                presence.setAbsent(false);
                presence.setEtudiant(action);
                presence.setSeance(seance);
                presenceRepository.save(presence);
                presences.add(presence);
            });
            seance.setPresences(presences);
        }
        return seance;
    }

    @Override
    public List<Seance> findAll() {
        return seanceRepository.findAll();
    }

    @Override
    public Seance save(Seance entity, Long primaryKeyAcitivite) {
        entity.setActivite(activiteRepository.findById(primaryKeyAcitivite).get());
        return seanceRepository.save(entity);
    }

    @Override
    public Boolean delete(Long primaryKey) {
        Seance seance = seanceRepository.findById(primaryKey).orElse(null);
        if(seance != null){
            seanceRepository.delete(seance);
            return true;
        }
        return false;
    }

    @Override
    public Seance update(Seance entity, Long primaryKeyAcitivite) {
        List<Presence> presences = entity.getPresences();
        presences.forEach(action->{
            action.setSeance(entity);
        });
        entity.setActivite(activiteRepository.findById(primaryKeyAcitivite).get());
        return seanceRepository.save(entity);
    }

    public Seance marquerPresence(List<Presence> presences, Long seanceId){
        Seance seance = find(seanceId);
        presences.forEach(action->{
            action.setSeance(seance);
        });
        seance.setPresences(presences);
        return save(seance,seance.getActivite().getId());
    }
}