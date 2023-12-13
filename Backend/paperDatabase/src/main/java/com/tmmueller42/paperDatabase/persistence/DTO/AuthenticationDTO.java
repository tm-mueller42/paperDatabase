package com.tmmueller42.paperDatabase.persistence.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Getter
@Setter
public class AuthenticationDTO {
    private String jwt;
    private String username;
    private String[] Authorities;
}
