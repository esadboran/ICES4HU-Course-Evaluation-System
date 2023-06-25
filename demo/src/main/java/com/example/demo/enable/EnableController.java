package com.example.demo.enable;

import com.example.demo.enable.EnableRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/enable")
@AllArgsConstructor
public class EnableController {

    private final EnableService enableService;

    @PutMapping
    public int enable(@RequestBody() EnableRequest request){
        return enableService.enable(request);
    }

    @DeleteMapping
    public void disable(@RequestBody() EnableRequest request) {
        enableService.disable(request.getEmail());
    }
}
