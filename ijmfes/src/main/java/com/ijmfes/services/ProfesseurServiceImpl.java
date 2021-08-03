package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Activite;
import com.ijmfes.models.Horraire;
import com.ijmfes.models.LigneNvMatiere;
import com.ijmfes.models.Professeur;
import com.ijmfes.repositories.HorraireRepository;
import com.ijmfes.repositories.NiveauMatiereRepository;
import com.ijmfes.repositories.ProfesseurRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfesseurServiceImpl implements ProfesseurService {

    @Autowired
    ProfesseurRepository professeurRepository;

    @Autowired
    HorraireRepository horraireRepository;

    @Autowired
    NiveauMatiereRepository niveauMatiereRepository;

    @Override
    public Professeur find(String primaryKey) {
        return professeurRepository.findById(primaryKey).get();
    }

    @Override
    public List<Professeur> findAll() {
        
        return professeurRepository.findAll();
    }

    @Override
    public Professeur save(Professeur entity) {
        return professeurRepository.save(entity);
    }

    @Override
    public Boolean delete(String primaryKey) {
        Professeur professeur = professeurRepository.findById(primaryKey).orElse(null);
        if(professeur != null){
            professeurRepository.delete(professeur);
            return true;
        }
        return false;
    }

    @Override
    public Boolean update(Professeur entity) {
        return professeurRepository.save(entity) != null;
    }
    
    @Override
    public String addHorraire(Horraire horraire, String professeurID){
        Professeur professeur = find(professeurID);
        //horraire.setProfesseur(professeur);
        
        if(professeur != null){
            professeur.getHorraires().add(horraire);
            update(professeur);
        }
        return horraire.getId();
    }

    @Override
    public String removeHorraire(String horraireID , String professeurID){
        Professeur professeur = find(professeurID);
        Horraire horraire = horraireRepository.findById(horraireID).orElse(null);

        if(horraire != null && professeur != null){
            List<Horraire> horraires = professeur.getHorraires();
            horraires.remove(horraire);
            professeur.setHorraires(horraires);

            update(professeur);
        }
        return horraireID;
    }

    //test si niveauxmatiere pour update
    @Override
    public String addNiveauMatiere(String niveauMatiereID , String professeurID){
        Professeur professeur = find(professeurID);
        LigneNvMatiere niveauMatiere = niveauMatiereRepository.findById(niveauMatiereID).orElse(null);
        if(niveauMatiere != null && professeur != null){
            List<LigneNvMatiere> niveauMatieres = professeur.getLigneNvMatieres();
            niveauMatieres.add(niveauMatiere);
            professeur.setLigneNvMatieres(niveauMatieres);
            update(professeur);
            return "1";
        }
        return "0";
    }

    public String removeNiveauMatiere(String niveauMatiereID , String professeurID){
        Professeur professeur = find(professeurID);
        LigneNvMatiere niveauMatiere = niveauMatiereRepository.findById(niveauMatiereID).orElse(null);

        if(niveauMatiere != null && professeur != null){
            List<LigneNvMatiere> niveauMatieres = professeur.getLigneNvMatieres();
            niveauMatieres.remove(niveauMatiere);
            professeur.setLigneNvMatieres(niveauMatieres);

            update(professeur);
        }

        return niveauMatiereID;
    }

    public List<Activite> getActivities(Professeur entity){
        return null;
    }
}   