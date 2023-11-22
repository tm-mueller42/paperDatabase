package com.tmmueller42.paperDatabase.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;
import java.util.Set;

@Entity(name = "UserPaperMapping")
@Table(name = "User_Paper_Mappings")
@Getter
@Setter
@NoArgsConstructor
public class UserPaperMapping {
/*
    @Id
    @GeneratedValue
    private Long id;

 */
    @EmbeddedId
    private UserPaperMappingId id;
    @ManyToOne
    @JsonIgnore
    @MapsId("user_Id")
    private User user;
    @ManyToOne
    @JsonIgnore
    @MapsId("paper_Id")
    private Paper paper;

    public UserPaperMapping(User user, Paper paper) {
        this.user = user;
        this.paper = paper;
        this.id = new UserPaperMappingId(user.getId(), paper.getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        UserPaperMapping that = (UserPaperMapping) o;
        return Objects.equals(user, that.user) &&
                Objects.equals(paper, that.paper);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, paper);
    }
}
