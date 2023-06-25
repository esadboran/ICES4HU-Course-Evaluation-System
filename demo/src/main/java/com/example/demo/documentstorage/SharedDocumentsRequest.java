package com.example.demo.documentstorage;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class SharedDocumentsRequest {
    private String owner;
    private String sharedWith;
}
