package com.tmmueller42.paperDatabase.api.endpoint;

import com.tmmueller42.paperDatabase.api.exception.ElementNotFoundException;
import com.tmmueller42.paperDatabase.persistence.DTO.SearchCriteria;
import com.tmmueller42.paperDatabase.persistence.entity.Paper;
import com.tmmueller42.paperDatabase.persistence.repository.PaperRepository;
import com.tmmueller42.paperDatabase.service.PaperService;
import lombok.AllArgsConstructor;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("papers")
@AllArgsConstructor
public class PaperEndpoint {

    private final PaperService paperService;

    @GetMapping
    List<Paper> findAll() {
        return paperService.findAll();
    }

    @GetMapping("{id}")
    Paper findById(@PathVariable Long id)  {
        return paperService.findById(id).orElseThrow(ElementNotFoundException::new);
    }

    @GetMapping("/title/{title}")
    Paper findByTitle(@PathVariable String title) throws ElementNotFoundException {
        return paperService.findByTitle(title).orElseThrow(ElementNotFoundException::new);
    }

    @GetMapping("/year/{from}/{to}")
    List<Paper> findByYearOfPublication(@PathVariable int from, @PathVariable int to) {
        return paperService.findByYearOfPublicationBetween(from, to);
    }

    @PostMapping("/filter")
    List<Paper> findFilteredPapers(@RequestBody SearchCriteria searchCriteria) {
        return paperService.findFilteredPapers(searchCriteria);
    }

    @PostMapping
    Paper save(@RequestBody Paper paper) {
        return paperService.save(paper);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable long id) {
        paperService.deleteById(id);
    }

}
