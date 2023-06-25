package com.example.demo.assignstudentstocourses;



import com.example.demo.assigninstructorstocourses.AssignInstructorRequest;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/assign_student")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AssignStudentController {

    private final AssignStudentService assignStudentService;

    //maybe put
    @PostMapping
    public void assignInstructor(@RequestBody AssignStudentRequest request){
        assignStudentService.assignStudent(request);


    }
}
