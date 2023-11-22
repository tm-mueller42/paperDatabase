package com.tmmueller42.paperDatabase.api.endpoint;

import com.tmmueller42.paperDatabase.api.exception.ElementNotFoundException;
import com.tmmueller42.paperDatabase.persistence.entity.Paper;
import com.tmmueller42.paperDatabase.persistence.entity.User;
import com.tmmueller42.paperDatabase.service.UserService;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("users")
public class UserEndpoint {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserEndpoint(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    @Secured("ROLE_ADMIN")
    List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("{id}")
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    User getById(@PathVariable Long id) throws ElementNotFoundException {
        return userService.getById(id).orElseThrow(ElementNotFoundException::new);
    }

    @GetMapping("{userId}/papers")
    @Secured({"ROLE_USER"})
    Set<Paper> getAllPapersByUserId(@PathVariable Long userId) {
        return userService.getAllPapersByUserId(userId);
    }

    @GetMapping("/filter")
    User getByName(@RequestParam String name) throws ElementNotFoundException {
        return userService.findByUsername(name)
                .orElseThrow(ElementNotFoundException::new);
    }

    @DeleteMapping("{id}")
    @Secured("ROLE_ADMIN")
    void delete(@PathVariable Long id) {
        userService.delete(id);
    }

    @PutMapping
    @Secured("ROLE_ADMIN")
    User update(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.update(user);
    }

    @GetMapping("/authority/{role}")
    @Secured("ROLE_ADMIN")
    List<User> findByAuthority(@PathVariable String role) {
        return userService.findByAuthority(role);
    }
}
