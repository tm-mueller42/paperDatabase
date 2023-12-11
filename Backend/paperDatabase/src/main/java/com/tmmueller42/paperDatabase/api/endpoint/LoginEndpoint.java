package com.tmmueller42.paperDatabase.api.endpoint;

import com.tmmueller42.paperDatabase.service.JwtGenerator;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("login")
public class LoginEndpoint {

    private final JwtGenerator jwtGenerator;

    public LoginEndpoint(JwtGenerator jwtGenerator) {
        this.jwtGenerator = jwtGenerator;
    }

    @GetMapping
    //@Secured({"ROLE_ADMIN", "ROLE_USER"})
    String jwt(Authentication authentication){
        return jwtGenerator.generate(authentication);
    }
}
