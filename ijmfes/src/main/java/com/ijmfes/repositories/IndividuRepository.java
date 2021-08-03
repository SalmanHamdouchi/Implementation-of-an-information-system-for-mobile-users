package com.ijmfes.repositories;

import com.ijmfes.models.Individu;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IndividuRepository extends JpaRepository<Individu, Long> {
    Individu findFirstById(Long id);
}
