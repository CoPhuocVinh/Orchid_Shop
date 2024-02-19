package org.jio.orchidbe.dtos.common;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jio.orchidbe.constants.BaseConstants;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseFilterRequest<T> {

    private int pageNumber = BaseConstants.DEFAULT_PAGE_NUMBER;
    private int pageSize = BaseConstants.DEFAULT_PAGE_SIZE;

    private String sortBy = BaseConstants.DEFAULT_SORT_BY;

    private Sort.Direction sortDir = BaseConstants.DEFAULT_SORT_DIRECTION;

    @JsonIgnore
    public Pageable getPageable() {
        int pageNumber = this.pageNumber > 0
                ? this.pageNumber
                : BaseConstants.DEFAULT_PAGE_NUMBER;
        int pageSize = this.pageSize > 0 && this.pageSize <= BaseConstants.DEFAULT_MAX_PAGE_SIZE
                ? this.pageSize
                : BaseConstants.DEFAULT_PAGE_SIZE;

        return sortBy != null
                ? PageRequest.of(pageNumber - 1, pageSize, sortDir, sortBy)
                : PageRequest.of(pageNumber - 1, pageSize);
    }
    @JsonIgnore

    public Sort getOrder() {
        return sortBy != null
                ? Sort.by(sortDir, sortBy)
                : Sort.unsorted();
    }

    @JsonIgnore

    public abstract Specification<T> getSpecification();
}
