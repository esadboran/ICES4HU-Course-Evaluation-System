package com.example.demo.assigninstructorstocourses;



import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/assign_instructor")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AssignInstructorController {

    private final AssignInstructorService assignInstructorService;
    private final AppUserRepository appUserRepository;
    //maybe put
    @PostMapping
    public void assignInstructor(@RequestBody AssignInstructorRequest request){
        assignInstructorService.assignInstructor(request);
    }

}
