package com.tmmueller42.paperDatabase.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity(name = "User")
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    private long id;
    private String username;
    private String password;
    private String email;
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> authorities;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<UserPaperMapping> userPaperMappings = new HashSet<>();
    /*
    @ManyToMany
    @JsonIgnore
    @JoinTable(name="USERS_PAPERS",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name = "papers_id"))
    private Set<Paper> papers;

     */
}
