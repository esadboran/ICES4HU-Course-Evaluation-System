package com.example.demo.semester;

import com.example.demo.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SemesterService {

    private final SemesterRepo semesterRepository;

    public void addSemester(Semester semester){
        semesterRepository.save(semester);
    }

    public List<Semester> listAll() {
        return semesterRepository.findAll();
    }
    public Semester getSemesterByName(String semesterName){
        return semesterRepository.findByName(semesterName);
    }

}