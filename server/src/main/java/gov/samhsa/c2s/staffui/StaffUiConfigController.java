package gov.samhsa.c2s.staffui;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaffUiConfigController {

    @RequestMapping(value = "/{path:[^\\\\.]*}")
    public String redirect() {
        return "forward:/";
    }
}
