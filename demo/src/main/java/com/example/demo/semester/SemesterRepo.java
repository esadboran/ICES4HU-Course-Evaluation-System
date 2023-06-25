package com.example.demo.semester;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface SemesterRepo extends JpaRepository<Semester, Long> {

    //write a query that returns a semester by name from scratch
    @Query("SELECT s FROM Semester s WHERE s.semesterName = ?1")
    Semester findByName(String name);






}
