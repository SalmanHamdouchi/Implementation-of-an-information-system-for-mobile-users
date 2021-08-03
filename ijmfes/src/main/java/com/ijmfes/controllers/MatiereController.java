package com.ijmfes.controllers;

import java.util.List;
import com.ijmfes.models.Matiere;
import com.ijmfes.services.MatiereService;
import com.ijmfes.services.NiveauMatiereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ijmfes")
public class MatiereController {

    @Autowired
    private MatiereService matiereService;
    @Autowired
    private NiveauMatiereService niveauMatiereService;


    @GetMapping(value = "/matieres")
    public List<Matiere> getMatieres() {

        List<Matiere> matieres = matiereService.findAll();
        return matieres;
    }

    @GetMapping(value = "/matiere/{id}")
    public Matiere getMatiere(@PathVariable("id") String id){
        Matiere matiere = matiereService.find(id);
        return matiere;
    }

    @GetMapping(path = "matiere/{id}/photo/")
    public byte[] getPhoto(@PathVariable("id") String nom) throws Exception{
        return matiereService.getImage(nom);
    }

    @PostMapping("/matiere")
    public ResponseEntity<Matiere> createMatiere(@RequestBody Matiere matiere) {
        return ResponseEntity.ok(matiereService.save(matiere));
    }

    @PostMapping("matiereniveau/{matiereId}/{niveaux}")
    public ResponseEntity<Integer> createMatiereWithNiveaux(@PathVariable("matiereId") String matiereId,
    @PathVariable("niveaux") int niveaux) {
        return ResponseEntity.ok(niveauMatiereService.addNiveauxToMatiere(matiereId,niveaux));
    }

    @DeleteMapping("/matiere/{id}")
    public Boolean deleteMatiere(@PathVariable("id") String id) {
        return matiereService.delete(id);
    }
            

    @PutMapping("/matiere")
    public Boolean updateMatiere(@RequestBody Matiere matiere){
        return matiereService.update(matiere);
    }

}