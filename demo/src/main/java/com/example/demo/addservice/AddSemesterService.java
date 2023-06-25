package com.example.demo.addservice;


import com.example.demo.semester.Semester;
import com.example.demo.semester.SemesterService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AddSemesterService {

        private final SemesterService semesterService;

        public void addSemester(AddSemesterRequest request){
            semesterService.addSemester(
                    new Semester(request.getStartDate(), request.getEndDate(), request.getSemesterName()
            ));
        }
}
