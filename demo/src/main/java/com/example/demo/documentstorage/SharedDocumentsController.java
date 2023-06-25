package com.example.demo.documentstorage;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/documents")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class SharedDocumentsController {

    private  SharedDocumentsService sharedDocumentsService;

    @RequestMapping("/shared")
    @PostMapping
    public List<String> getAllDocumentsSharedByAUser(@RequestBody SharedDocumentsRequest request) {
        return sharedDocumentsService.findNamesOfAllDocumentsSharedByAUser(request.getOwner());
    }

    //get all documents that a user has received
    @RequestMapping("/received")
    @PostMapping
    public List<String> getAllDocumentsReceivedByAUser(@RequestBody SharedDocumentsRequest request) {
        return sharedDocumentsService.findNamesOfAllDocumentsReceivedByAUser(request.getSharedWith());
    }





    //@Value("${document.storage.path}")
    private final String documentStoragePath = "/Users/esadboran/Desktop/documentStorage";


    @RequestMapping("/upload")
    @PostMapping
    public String handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("owner") String sender,
                                   @RequestParam("receiver") String receiver) throws IOException {
        if (!file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            File documentFile = new File(documentStoragePath + File.separator + fileName);
            FileCopyUtils.copy(file.getBytes(), documentFile);
            // Additional processing or saving the file metadata to the database can be done here

            // Save the file metadata to the database
            sharedDocumentsService.saveDocumentMetadata( sender,  receiver,fileName);


            return "redirect:/success"; // Redirect to a success page
        }
        return "redirect:/error"; // Redirect to an error page
    }

    @GetMapping("/download/{fileName}")
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
