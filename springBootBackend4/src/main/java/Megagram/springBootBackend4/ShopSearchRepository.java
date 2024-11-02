package Megagram.springBootBackend4;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShopSearchRepository extends JpaRepository<ShopSearch, ShopSearchId> {

    @Query("SELECT s FROM ShopSearch s WHERE s.id.searcherUsername = :username ORDER BY s.dateTime DESC")
    List<ShopSearch> findBySearcherUsernameOrderByDateTimeDesc(@Param("username") String username);

    @Query("SELECT s FROM ShopSearch s WHERE s.id.search = :search AND s.id.searcherUsername = :searcherUsername AND s.id.searchCategory = :searchCategory")
    ShopSearch findById(@Param("search") String search, @Param("searcherUsername") String searcherUsername, @Param("searchCategory") String searchCategory);

    @Query("SELECT s.id.search FROM ShopSearch s WHERE s.id.searchCategory = :searchCategory GROUP BY s.id.search ORDER BY COUNT(s) DESC")
    List<String> orderByPopularity(@Param("searchCategory") String searchCategory);

    @Query("SELECT s.id.search FROM ShopSearch s GROUP BY s.id.search ORDER BY COUNT(s) DESC")
    List<String> orderByPopularityForAllCategories();
}
