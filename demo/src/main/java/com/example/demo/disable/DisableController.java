package com.example.demo.disable;

import com.example.demo.enable.EnableRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/disable")
@AllArgsConstructor
public class DisableController {

        private final DisableService disableService;

        @DeleteMapping
        public void disable(@RequestBody() DisableRequest request){
            disableService.disable(request.getEmail());
        }


}
