package com.example.demo.documentstorage;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SharedDocumentsService {

    private final SharedDocumentsRepository sharedDocumentsRepository;

    public void saveDocumentMetadata(String sender,String receiver, String fileName) {
        SharedDocuments sharedDocuments = new SharedDocuments(fileName, sender, receiver);
        sharedDocumentsRepository.save(sharedDocuments);
    }

    public void downloadDocument(DownloadRequest downloadRequest) {

    }

    //find all the documents that a user has shared
    public List<String> findNamesOfAllDocumentsSharedByAUser(String owner) {
        List<SharedDocuments> sharedDocuments = sharedDocumentsRepository.findNamesOfAllDocumentsSharedByAUser(owner);
        return sharedDocuments.stream().map(SharedDocuments::getDocumentName).collect(Collectors.toList());

    }

    //find all the documents that a user has received
    public List<String> findNamesOfAllDocumentsReceivedByAUser(String owner) {
        List<SharedDocuments> sharedDocuments = sharedDocumentsRepository.findNamesOfAllDocumentsReceivedByAUser(owner);
        return sharedDocuments.stream().map(SharedDocuments::getDocumentName).collect(Collectors.toList());
    }



}
