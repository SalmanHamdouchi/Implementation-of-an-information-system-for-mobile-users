package com.ijmfes.services;

import java.util.List;

import com.ijmfes.models.Presence;
import com.ijmfes.models.Seance;

public interface SeanceService {
    Seance find(Long primaryKey);
    Seance findAvecPresence(Long primaryKey);
    List<Seance> findAll();
    Seance save(Seance entity, Long primaryKeyAcitivite);
    Boolean delete(Long primaryKey);
    Seance update(Seance entity, Long primaryKeyAcitivite);
    Seance marquerPresence(List<Presence> presences, Long seanceId);
}