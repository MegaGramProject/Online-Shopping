package Megagram.springBootBackend4;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductSearchTagRepository extends MongoRepository<ProductSearchTag, String> {

    ProductSearchTag findByProductId(String productId);

    void deleteByProductId(String productId);

    @Query("{ 'productId': { '$in': :#{#productIds} } }")
    List<ProductSearchTag> filterByProductIdInList(@Param("productIds") List<String> productIds);

}
