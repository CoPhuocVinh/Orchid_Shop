package org.jio.orchidbe.repositorys.feedbacks;

import org.jio.orchidbe.models.feedbacks.Feedbacks;
import org.jio.orchidbe.models.feedbacks.Replys;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Replys, Long> {
    Page<Replys> findAll(Specification<Replys> specification, Pageable pageable);
}
