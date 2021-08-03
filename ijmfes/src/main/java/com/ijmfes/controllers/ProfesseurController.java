package com.ijmfes.controllers;

import java.util.List;

import com.ijmfes.models.Horraire;
import com.ijmfes.models.Professeur;
import com.ijmfes.services.ProfesseurService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ijmfes")
public class ProfesseurController {
    @Autowired
    private ProfesseurService professeurService;

    @GetMapping(value = "/professeurs")
    public List<Professeur> getProfesseurs() {

        List<Professeur> professeurs = professeurService.findAll();
        return professeurs;
    }

    @GetMapping(value = "/professeur/{id}")
    public Professeur getProfesseur(@PathVariable("id") String id){
        Professeur professeur = professeurService.find(id);
        return professeur;
    }
    
    @PostMapping("/professeur")
    public ResponseEntity<Professeur> createProfesseur(@RequestBody Professeur professeur) {
        return ResponseEntity.ok(professeurService.save(professeur));
    }

    @DeleteMapping("/professeur/{id}")
    public Boolean deleteProfesseur(@PathVariable("id") String id) {
        if(professeurService.find(id).getLigneNvMatieres().size() == 0 &&
        professeurService.find(id).getHorraires().size() == 0)
            return professeurService.delete(id);
        return false;
    }
            
    @PutMapping("/professeur")
    public Boolean updateProfesseur(@RequestBody Professeur etudiant){
        return professeurService.update(etudiant);
    }

    //idniveaux matier concat
    @PostMapping("/professeur/{idProfesseur}/niveaumatiere/{idNiveauMatiere}")
    public String addNiveauMatiereToProf(@PathVariable("idProfesseur") String idProfesseur,
                                   @PathVariable("idNiveauMatiere") String idNiveauMatiere)
    {
        return professeurService.addNiveauMatiere(idNiveauMatiere, idProfesseur);
    }

    @DeleteMapping("/professeur/{idProfesseur}/niveaumatiere/{idNiveauMatiere}")
    public String removeNiveauMatiereFromoProf(@PathVariable("idProfesseur") String idProfesseur,
                                       @PathVariable("idNiveauMatiere") String idNiveauMatiere) 
    {
        return professeurService.removeNiveauMatiere(idNiveauMatiere, idProfesseur);
    }

    @PostMapping("/professeur/{idProfesseur}/horraire/")
    public String addHorraireToProf(@PathVariable("idProfesseur") String idProfesseur, @RequestBody Horraire horraire)
    {
        return professeurService.addHorraire(horraire, idProfesseur);
    }

    @DeleteMapping("/professeur/{idProfesseur}/horraire/{idHorraire}")
    public String removeHorraireFromProf(@PathVariable("idProfesseur") String idProfesseur,
                                       @PathVariable("idHorraire") String idHorraire) 
    {
        return professeurService.removeHorraire(idHorraire, idProfesseur);
    }
}