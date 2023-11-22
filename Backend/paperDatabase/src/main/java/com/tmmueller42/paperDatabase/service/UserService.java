package com.tmmueller42.paperDatabase.service;

import com.tmmueller42.paperDatabase.api.exception.ElementNotFoundException;
import com.tmmueller42.paperDatabase.persistence.entity.Paper;
import com.tmmueller42.paperDatabase.persistence.entity.User;
import com.tmmueller42.paperDatabase.persistence.entity.UserPaperMapping;
import com.tmmueller42.paperDatabase.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    public Set<Paper> getAllPapersByUserId(Long userId) {
        return getById(userId).map(User::getUserPaperMappings)
                .stream().flatMap(Collection::stream).map(UserPaperMapping::getPaper).collect(Collectors.toSet());
    }

    /*public User getCurrentUser (Principal principal) {
        return principal.getName();
    }

     */

}
