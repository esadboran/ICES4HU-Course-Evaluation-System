package com.example.demo.unban;


import com.example.demo.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/unban")
@AllArgsConstructor
public class UnBanController {

        private final UnBanService unBanService;
        @PutMapping
        public AppUser ban(@RequestBody() UnBanRequest request){
            return unBanService.unban(request);
        }
}
