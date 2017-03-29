package gov.samhsa.c2s.staffadminui;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaffAdminUiConfigController {

    @RequestMapping(value = "/{path:[^\\\\.]*}")
    public String redirect() {
        return "forward:/";
    }
}
