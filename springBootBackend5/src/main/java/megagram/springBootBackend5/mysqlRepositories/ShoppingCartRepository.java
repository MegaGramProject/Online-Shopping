package megagram.springBootBackend5.mysqlRepositories;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import megagram.springBootBackend5.mysqlModels.ShoppingCart;
import megagram.springBootBackend5.mysqlModels.ShoppingCartId;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, ShoppingCartId> {

    @Query("SELECT s FROM ShoppingCart s WHERE s.id.username = :username")
    List<ShoppingCart> findByUsername(@Param("username") String username);

    Optional<ShoppingCart> findById(ShoppingCartId id);

}
