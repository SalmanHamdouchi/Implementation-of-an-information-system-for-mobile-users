package com.ijmfes.controllers;

import com.ijmfes.models.Seance;
import com.ijmfes.models.Presence;
import java.util.List;

import com.ijmfes.services.SeanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/ijmfes")
public class SeanceController {

    @Autowired
    private SeanceService seanceService;

    @GetMapping(value = "/seance/{id}")
    public Seance getSeance(@PathVariable("id") Long id){
        return seanceService.find(id);
    }

    @GetMapping(value = "/seanceavecpresence/{id}")
    public Seance getSeanceAvecPresence(@PathVariable("id") Long id){
        return seanceService.findAvecPresence(id);
    }
    
    @PostMapping("/seance/{activiteId}")
    public ResponseEntity<Seance> createSeance(@RequestBody Seance seance, @PathVariable Long activiteId) {
        return ResponseEntity.ok(seanceService.save(seance,activiteId));
    }

    @PostMapping("/presances/{seanceId}")
    public ResponseEntity<Seance> marquerPresence(@RequestBody List<Presence> presences,@PathVariable Long seanceId) {
        return ResponseEntity.ok(seanceService.marquerPresence(presences,seanceId));
    }

    @DeleteMapping("/seance/{id}")
    public Boolean deleteSeance(@PathVariable("id") Long id) {
        return seanceService.delete(id);
    }

    @PutMapping("/seance/{activiteId}")
    public Seance updateSeance(@RequestBody Seance seance, @PathVariable Long activiteId) {
        return seanceService.update(seance,activiteId);
    }
    
}