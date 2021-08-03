package com.ijmfes.controllers;

import java.util.Collections;
import java.util.List;

import com.ijmfes.models.*;
import com.ijmfes.services.ActiviteService;
import com.ijmfes.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/ijmfes")
public class ActiviteConroller {
    @Autowired
    private ActiviteService activiteService;
    @Autowired
    private UserService userService;


    @GetMapping(value = "/activite/{activiteId}")
    public Activite getActiviyById(@PathVariable Long activiteId) {
        Activite activite=activiteService.find(activiteId);
      //  List<Seance> seances=activite.getSeances();
     //   Collections.sort(seances);
     //   activite.setSeances(seances);
       // System.out.println("iciiiiiii");
        return activite;
    }


    @GetMapping(value = "/activiteetudiant/{activiteId}")
    public Activite getActiviyByIdForEtudiant(@PathVariable Long activiteId) {
        return activiteService.find(activiteId);
    }
    @GetMapping(value = "/etudactiviteetudiant/{activiteId}")
    public Activite getActiviyByIdForEtudiant2(@PathVariable Long activiteId) {
        return activiteService.find(activiteId);
    }

    @GetMapping(value = "/activiteseances/{activiteId}")
    public List<Seance> getSeancesByActiviyId(@PathVariable Long activiteId) {
         List<Seance> seances=activiteService.getSeances(activiteId);
          Collections.sort(seances);
           //activite.setSeances(seances);
        return  seances;
    }


    @GetMapping(value = "/etudactiviteseances/{activiteId}")
    public List<Seance> getSeancesByActiviyId2(@PathVariable Long activiteId) {
        List<Seance> seances=activiteService.getSeances(activiteId);
        Collections.sort(seances);
        //activite.setSeances(seances);
        return  seances;
    }
    @GetMapping(value = "/login/{professeurEmail}")
    public Professeur getProfesseur(@PathVariable String professeurEmail) {
        return ((User)userService.findUserByUsername(professeurEmail)).getProf();
    }


    @GetMapping(value = "/loginetudiant/{etudiantEmail}")
    public Etudiant getEtudiant(@PathVariable String etudiantEmail) {
        return userService.findUserByUsername(etudiantEmail).getEtudiant();
    }


    @GetMapping(value = "/activitesprofesseur/{professeurId}")
    public List<Activite> getActivityByProfesseurId(@PathVariable String professeurId) {
        return activiteService.findAllByProfesseurId(professeurId);
    }
    
}