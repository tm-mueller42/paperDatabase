package com.tmmueller42.paperDatabase.persistence.DTO;


import lombok.*;

import java.util.List;

@Getter
//@Builder(toBuilder = true)
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchCriteria {

    private List<Filter> filters;

    @Getter
    //@Builder(toBuilder = true)
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Filter {
       public enum QueryOperator {
            EQUALS, NOT_EQUALS, LIKE, LESS_THAN, GREATER_THAN
        }

        private String field; // Name of the filed from entity like firstName
        //private QueryOperator operator; // Operator we like to apply
        private QueryOperator operator;
        private String value; // value we would like to match
    }
}