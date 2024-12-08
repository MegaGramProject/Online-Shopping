package megagram.springBootBackend5.mysqlRepositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;
import megagram.springBootBackend5.mysqlModels.ShoppingCart;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Integer> {

    @Query("SELECT s FROM ShoppingCart s WHERE s.username = :username")
    List<ShoppingCart> findByUsername(@Param("username") String username);

    Optional<ShoppingCart> findById(Integer id);

    @Query("SELECT s FROM ShoppingCart s WHERE s.id IN :ids")
    List<ShoppingCart> findByListOfIds(@Param("ids") List<Integer> ids);

    @Modifying
    @Transactional
    @Query("DELETE FROM ShoppingCart s WHERE s.id IN :ids")
    int deleteByListOfIds(@Param("ids") List<Integer> ids);

}
