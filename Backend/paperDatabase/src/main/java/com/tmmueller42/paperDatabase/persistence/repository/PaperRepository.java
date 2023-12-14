package com.tmmueller42.paperDatabase.persistence.repository;

import com.tmmueller42.paperDatabase.persistence.entity.Paper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface PaperRepository extends JpaRepository<Paper, Long>, JpaSpecificationExecutor<Paper> {
    Optional<Paper> findByTitle(String title);

    List<Paper> findByYearOfPublicationBetween(int from, int to);
}
