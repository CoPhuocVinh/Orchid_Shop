package org.jio.orchidbe.repositorys.wallets;

import org.jio.orchidbe.models.wallets.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByUser_Id(Long userId);
}
