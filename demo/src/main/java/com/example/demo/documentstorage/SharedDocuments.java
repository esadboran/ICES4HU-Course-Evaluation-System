package com.example.demo.documentstorage;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class SharedDocuments {

    @SequenceGenerator(
            name = "documents_sequence",
            sequenceName = "documents_sequence",
            allocationSize = 1)
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "documents_sequence")

    private long id;

    private String documentName;

    private String documentOwner;
    private String documentSharedWith;

    public SharedDocuments(String documentName, String documentOwner, String documentSharedWith) {
        this.documentName = documentName;
        this.documentOwner = documentOwner;
        this.documentSharedWith = documentSharedWith;
    }



}
