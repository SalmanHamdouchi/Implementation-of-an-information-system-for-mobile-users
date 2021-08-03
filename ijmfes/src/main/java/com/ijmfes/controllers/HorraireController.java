package com.ijmfes.controllers;

import com.ijmfes.services.HorraireServiceImpl;
import java.util.List;
import com.ijmfes.models.Horraire;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ijmfes")
public class HorraireController {
    
    @Autowired
    private HorraireServiceImpl horraireService;

    @GetMapping(value = "/horraires")
    public List<Horraire> getHorraires() {

        List<Horraire> horraires = horraireService.findAll();
        return horraires;
    }

    @GetMapping(value = "/horraire/{id}")
    public Horraire getHorraire(@PathVariable("id") String id){
        Horraire horraire = horraireService.find(id);
        return horraire;
    }
    
    @PostMapping("/horraire")
    public ResponseEntity<Horraire> createHorraire(@RequestBody Horraire horraire) {
        return ResponseEntity.ok(horraireService.save(horraire));
    }

    @DeleteMapping("/horraire/{id}")
    public Boolean deleteHorraire(@PathVariable("id") String id) {
        return horraireService.delete(id);
    }
            

    @PutMapping("/horraire")
    public Boolean updateHorraire(@RequestBody Horraire horraire){
        return horraireService.update(horraire);
    }

}