package com.example.demo.ban;



import com.example.demo.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/ban")
@AllArgsConstructor
public class BanController {

        private final BanService banService;
        @PutMapping
        public void ban(@RequestBody() BanRequest request){
             banService.ban(request);
        }
}
