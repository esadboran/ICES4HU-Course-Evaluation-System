package com.example.demo.documentstorage;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
@RestController
@RequestMapping(path = "api/v1/download")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class DownloadController {

    //@Value("${document.storage.path}")
    private final String documentStoragePath = "/Users/esadboran/Desktop/documentStorage";

    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) throws IOException {
        Path filePath = Paths.get(documentStoragePath).resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (resource.exists()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        }
        return ResponseEntity.notFound().build(); // Return a 404 Not Found if the file does not exist
    }
}
