package org.jio.orchidbe.repositorys.products;

import org.jio.orchidbe.models.wallets.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
}
