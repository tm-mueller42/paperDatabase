package com.tmmueller42.paperDatabase.service;

import com.tmmueller42.paperDatabase.api.exception.ElementNotFoundException;
import com.tmmueller42.paperDatabase.persistence.DTO.SearchCriteria;
import com.tmmueller42.paperDatabase.persistence.entity.Paper;
import com.tmmueller42.paperDatabase.persistence.repository.PaperRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class PaperService {

    private final PaperRepository paperRepository;
    private final EntitySpecification<Paper> entitySpecification;

    public List<Paper> findAll() {
        return paperRepository.findAll();
    }

    public Optional<Paper> findByTitle(String title) {
        return paperRepository.findByTitle(title);
    }

    public List<Paper> findByYearOfPublicationBetween(int from, int to) {
        return paperRepository.findByYearOfPublicationBetween(from, to);
    }

    public Paper save(Paper paper) {
        return paperRepository.save(paper);
    }

    public void deleteById(long id) {
        paperRepository.deleteById(id);
    }

    public Optional<Paper> findById(Long id) {
        return paperRepository.findById(id);
    }

    public List<Paper> findFilteredPapers(SearchCriteria searchCriteria) {
        return paperRepository.findAll(entitySpecification.specificationBuilder(searchCriteria));
    }
}
