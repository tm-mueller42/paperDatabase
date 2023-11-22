package com.tmmueller42.paperDatabase.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity(name = "Paper")
@Table(name="paper")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Paper {
    @Id
    @GeneratedValue
    private long id;
    private String DOI;
    private String title;
    @ElementCollection(fetch = FetchType.EAGER)
/*    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "authors", joinColumns = @JoinColumn(name = "paper_id"))
    @Column(name = "author", nullable = false) */
    private List<String> authors = new ArrayList<>();
    private String journal;
    private String field;
    private int yearOfPublication;
    @ManyToMany
    private Set<User> users;
}
