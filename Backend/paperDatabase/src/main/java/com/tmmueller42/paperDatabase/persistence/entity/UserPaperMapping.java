package com.tmmueller42.paperDatabase.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity(name = "UserPaperMapping")
@Table(name = "User_Paper_Mappings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPaperMapping {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    @JsonIgnore
    private User user;
    @ManyToOne
    @JsonIgnore
    private Paper paper;
}
