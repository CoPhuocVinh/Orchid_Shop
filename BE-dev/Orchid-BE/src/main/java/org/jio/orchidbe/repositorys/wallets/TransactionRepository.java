package org.jio.orchidbe.repositorys.wallets;

import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.wallets.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>, JpaSpecificationExecutor<Transaction> {
}
