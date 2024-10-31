package megagram.springBootBackend5.mysqlRepositories;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import megagram.springBootBackend5.mysqlModels.ProductDeliveryTime;
import megagram.springBootBackend5.mysqlModels.ProductDeliveryTimeId;

public interface ProductDeliveryTimeRepository extends JpaRepository<ProductDeliveryTime, ProductDeliveryTimeId> {
    Optional<ProductDeliveryTime> findById(ProductDeliveryTimeId id);
    List<ProductDeliveryTime> findById_ProductId(String productId);
}
