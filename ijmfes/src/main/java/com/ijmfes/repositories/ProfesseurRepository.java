package com.ijmfes.repositories;

import com.ijmfes.models.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesseurRepository extends JpaRepository<Professeur, String> {

}