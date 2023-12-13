package com.tmmueller42.paperDatabase.api.endpoint;

import com.tmmueller42.paperDatabase.persistence.DTO.AuthenticationDTO;
import com.tmmueller42.paperDatabase.service.JwtGenerator;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping("login")
public class LoginEndpoint {

    private final JwtGenerator jwtGenerator;

    public LoginEndpoint(JwtGenerator jwtGenerator) {
        this.jwtGenerator = jwtGenerator;
    }

    @GetMapping
    @ResponseBody
    //@Secured({"ROLE_ADMIN", "ROLE_USER"})
/*    String jwt(Authentication authentication){
        return jwtGenerator.generate(authentication);

 */
    AuthenticationDTO authenticate(Authentication authentication) {
        return new AuthenticationDTO(
                jwtGenerator.generate(authentication),
                authentication.getName(),
                AuthorityUtils.authorityListToSet(authentication.getAuthorities()).toArray(new String[0])
        );
    }
}
