package com.tmmueller42.paperDatabase.service;

import com.tmmueller42.paperDatabase.persistence.entity.User;
import com.tmmueller42.paperDatabase.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByUsername(String name) { return userRepository.findByUsername(name); }

    public User create(User user) {
        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public User update(User user) {
        return userRepository.save(user);
    }

    public List<User> findByAuthority(String authority) { return userRepository.findByAuthoritiesContaining(authority); }

    /*public User getCurrentUser (Principal principal) {
        return principal.getName();
    }

     */

}
