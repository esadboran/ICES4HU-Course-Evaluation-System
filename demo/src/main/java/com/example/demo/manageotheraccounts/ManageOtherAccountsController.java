package com.example.demo.manageotheraccounts;
import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import com.example.demo.updateprofile.UpdateProfileRequest;
import com.example.demo.appuser.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/manageOtherAccounts")
@AllArgsConstructor
public class ManageOtherAccountsController {

        private final ManageOtherAccountsService manageOtherAccountsService;
        private final AppUserRepository appUserRepository;

        @PutMapping(path = "/updateOtherAccounts")
        public void updateOtherAccounts(@RequestBody() ManageOtherAccountsRequest request) {
                manageOtherAccountsService.updateOtherAccounts(request);

        }

        @PutMapping(path = "/banOtherAccounts")
        public void banOtherAccounts(@RequestBody() ManageOtherAccountsRequest request) {

        }

        @PutMapping(path = "/unbanOtherAccounts")
        public void unbanOtherAccounts(@RequestBody() ManageOtherAccountsRequest request) {

        }

        @DeleteMapping(path = "/deleteOtherAccounts")
        public void deleteOtherAccounts(@RequestBody() ManageOtherAccountsRequest request) {

        }

}
