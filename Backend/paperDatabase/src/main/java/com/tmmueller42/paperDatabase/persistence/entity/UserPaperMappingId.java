package com.tmmueller42.paperDatabase.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class UserPaperMappingId implements Serializable {
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "paper_id")
    private Long paperId;

    public UserPaperMappingId(
            Long userId,
            Long paperId) {
        this.userId = userId;
        this.paperId = paperId;
    }

    public UserPaperMappingId() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        UserPaperMappingId that = (UserPaperMappingId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(paperId, that.paperId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, paperId);
    }

}
