package Megagram.springBootBackend4;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductSearchTagRepository extends MongoRepository<ProductSearchTag, String> {
    ProductSearchTag findByProductId(String productId);
    void deleteByProductId(String productId);
}
