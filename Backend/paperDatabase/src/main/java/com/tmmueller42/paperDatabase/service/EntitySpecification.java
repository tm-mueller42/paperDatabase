package com.tmmueller42.paperDatabase.service;
import com.tmmueller42.paperDatabase.persistence.DTO.SearchCriteria;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class EntitySpecification<T> {

    public Specification<T> specificationBuilder(SearchCriteria searchCriteria) {
        if(Objects.nonNull(searchCriteria) && CollectionUtils.isNotEmpty(searchCriteria.getFilters())) {
            List<SearchCriteria.Filter> filters = searchCriteria.getFilters();
            List<Specification<T>> specifications = filters.stream()
                    .map(this::createSpecification)
                    .collect(Collectors.toList());

            return Specification.allOf(specifications);
        }
        return null;
    }

    private Specification<T> createSpecification(SearchCriteria.Filter filter) {
        return switch (filter.getOperator()) {
            case EQUALS ->
                    (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(filter.getField()), filter.getValue());
            case NOT_EQUALS ->
                    (root, query, criteriaBuilder) -> criteriaBuilder.notEqual(root.get(filter.getField()), filter.getValue());
            case GREATER_THAN ->
                    (root, query, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get(filter.getField()), filter.getValue());
            case LESS_THAN ->
                    (root, query, criteriaBuilder) -> criteriaBuilder.lessThanOrEqualTo(root.get(filter.getField()), filter.getValue());
            case LIKE ->
                    (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get(filter.getField()), "%" + filter.getValue() + "%");
        };
    }

}