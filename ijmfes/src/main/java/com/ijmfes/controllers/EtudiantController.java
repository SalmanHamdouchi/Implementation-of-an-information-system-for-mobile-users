package com.ijmfes.controllers;

import com.ijmfes.services.EtudiantService;

import java.util.List;

import com.ijmfes.models.Activite;
import com.ijmfes.models.Etudiant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/ijmfes")
public class EtudiantController {
    
    @Autowired
    private EtudiantService etudiantService;

    @GetMapping(value = "/etudiants")
    public List<Etudiant> getEtudiants() {

        List<Etudiant> etudiants = etudiantService.findAll();
        return etudiants;
    }

    @GetMapping(value = "/etudiant/activites/{etudiantId}")
    public List<Activite> getActivitesByEtudiant(@PathVariable String etudiantId) {
        return etudiantService.findAllActivite(etudiantId);
    }

    @GetMapping(value = "/etudiant/{id}")
    public Etudiant getEtudiant(@PathVariable("id") Long id){
        Etudiant etudiant = etudiantService.find(id);
        return etudiant;
    }

    @GetMapping(value = "/activite/etudiants/{id}")
    public ResponseEntity<List<Etudiant>> getEtudiantByActivite(@PathVariable("id") Long id){
        return ResponseEntity.ok(etudiantService.findEtudiantByActivite(id));
    }
    
    @PostMapping("/etudiant")
    public ResponseEntity<Etudiant> createEtudiant(@RequestBody Etudiant etudiant) {
        return ResponseEntity.ok(etudiantService.save(etudiant));
    }

    @DeleteMapping("/etudiant/{id}")
    public Boolean Etudiant(@PathVariable("id") Long id) {
        return etudiantService.delete(id);
    }
            

    @PutMapping("/etudiant")
    public Boolean updateEtudiant(@RequestBody Etudiant etudiant){
        return etudiantService.update(etudiant);
    }

}