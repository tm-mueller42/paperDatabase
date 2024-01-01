package com.tmmueller42.paperDatabase.api.endpoint;

import com.tmmueller42.paperDatabase.persistence.entity.User;
import com.tmmueller42.paperDatabase.service.UserService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("register")
public class RegisterEndpoint {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public RegisterEndpoint(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    //@Secured("ROLE_ADMIN")
    User create(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.create(user);
    }
}
