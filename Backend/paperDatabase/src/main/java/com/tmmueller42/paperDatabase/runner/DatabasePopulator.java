package com.tmmueller42.paperDatabase.runner;

import com.tmmueller42.paperDatabase.persistence.entity.Paper;
import com.tmmueller42.paperDatabase.persistence.entity.User;
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
    //private List<Paper> papers;

    @Bean
    ApplicationRunner dbPopulator(UserRepository userRepository,
                                  PaperRepository paperRepository,
                                  PasswordEncoder passwordEncoder){
        return args -> {


            userRepository.saveAll(users);
            //paperRepository.saveAll(papers);

/*
            User user = users.get(0);
            User admin = users.get(1);
            Paper paper1 = papers.get(0);
            Paper paper2 = papers.get(1);
            Paper paper3 = papers.get(2);

            user.setPassword(passwordEncoder.encode("123"));
            user.setPapers(Set.of(paper1, paper3));
            admin.setPassword(passwordEncoder.encode("123"));
            admin.setPapers(Set.of(paper2, paper3));
            paper1.setUsers(Set.of(user));
            paper2.setUsers(Set.of(admin));
            paper3.setUsers(Set.of(user, admin));

            paperRepository.saveAll(Set.of(paper1, paper2, paper3));
            userRepository.saveAll(Set.of(user, admin));

 */
        };
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
    /*
    public void setPapers(List<Paper> papers) {
        this.papers = papers;
    }

     */
}
