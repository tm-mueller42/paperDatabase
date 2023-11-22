package com.tmmueller42.paperDatabase.runner;

import com.tmmueller42.paperDatabase.persistence.entity.Paper;
import com.tmmueller42.paperDatabase.persistence.entity.User;
import com.tmmueller42.paperDatabase.persistence.entity.UserPaperMapping;
import com.tmmueller42.paperDatabase.persistence.repository.PaperRepository;
import com.tmmueller42.paperDatabase.persistence.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

@Configuration
@ConfigurationProperties("datasets")
public class DatabasePopulator {

    private List<User> users;

    @Bean
    ApplicationRunner dbPopulator(UserRepository userRepository,
                                  PaperRepository paperRepository,
                                  PasswordEncoder passwordEncoder){
        return args -> {

            userRepository.saveAll(users);


            User user = users.get(0);
            user.setPassword(passwordEncoder.encode("123"));
            user.setAuthorities(Set.of("ROLE_USER"));
            User admin = users.get(1);
            admin.setPassword(passwordEncoder.encode("123"));
            admin.setAuthorities(Set.of("ROLE_USER", "ROLE_ADMIN"));

            Paper paper1 = new Paper(0, "", "Title1", List.of("author1"), "", "", 0, Set.of());
            paperRepository.save(paper1);
            Paper paper2 = new Paper(0, "", "Title2", List.of("author2"), "", "", 0, Set.of());
            paperRepository.save(paper2);
            Paper paper3 = new Paper(0, "", "Title3", List.of("author3"), "", "", 0, Set.of());
            paperRepository.save(paper3);

            UserPaperMapping paper1ForUser = new UserPaperMapping(user, paper1);
            UserPaperMapping paper3ForUser = new UserPaperMapping(user, paper3);
            UserPaperMapping paper2ForAdmin = new UserPaperMapping(admin, paper2);
            UserPaperMapping paper3ForAdmin = new UserPaperMapping(admin, paper3);


            user.setUserPaperMappings(Set.of(paper1ForUser, paper3ForUser));
            admin.setUserPaperMappings(Set.of(paper2ForAdmin, paper3ForAdmin));
            paper1.setUserPaperMappings(Set.of(paper1ForUser));
            paper2.setUserPaperMappings(Set.of(paper2ForAdmin));
            paper3.setUserPaperMappings(Set.of(paper3ForUser, paper3ForAdmin));

            paperRepository.saveAll(Set.of(paper1, paper2, paper3));
            userRepository.saveAll(Set.of(user, admin));

        };
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }



}
