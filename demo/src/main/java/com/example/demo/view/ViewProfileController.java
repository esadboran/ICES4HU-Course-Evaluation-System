package com.example.demo.view;
import com.example.demo.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/view")
@AllArgsConstructor
public class ViewProfileController {

        private final ViewProfileService viewProfileService;
        @GetMapping
        public AppUser view(@RequestBody() ViewProfileRequest request){
            return viewProfileService.view(request);
        }
}
