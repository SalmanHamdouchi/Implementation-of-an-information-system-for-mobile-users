package com.ijmfes.repositories;

import com.ijmfes.models.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnneeRepository extends JpaRepository<Annee,String> {
    
}