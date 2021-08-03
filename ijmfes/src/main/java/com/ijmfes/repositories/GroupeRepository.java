package com.ijmfes.repositories;

import com.ijmfes.models.Groupe;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupeRepository extends JpaRepository<Groupe, Long> {
    Groupe findFirstById(Long id);
}