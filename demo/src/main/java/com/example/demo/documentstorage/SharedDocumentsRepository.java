package com.example.demo.documentstorage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface SharedDocumentsRepository extends JpaRepository<SharedDocuments, Long> {

    //write a query that finds all the documents that a user has owns
    @Query("SELECT s FROM SharedDocuments s WHERE s.documentOwner = ?1")
    List<SharedDocuments> findNamesOfAllDocumentsSharedByAUser(String owner);

    //find all the documents that a user has received
    @Query("SELECT s FROM SharedDocuments s WHERE s.documentSharedWith = ?1")
    List<SharedDocuments> findNamesOfAllDocumentsReceivedByAUser(String owner);



}
