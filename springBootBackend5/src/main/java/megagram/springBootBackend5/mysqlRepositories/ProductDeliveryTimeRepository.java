package megagram.springBootBackend5.mysqlRepositories;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import megagram.springBootBackend5.mysqlModels.ProductDeliveryTime;
import megagram.springBootBackend5.mysqlModels.ProductDeliveryTimeId;

public interface ProductDeliveryTimeRepository extends JpaRepository<ProductDeliveryTime, ProductDeliveryTimeId> {
    Optional<ProductDeliveryTime> findById(ProductDeliveryTimeId id);
    List<ProductDeliveryTime> findById_ProductId(String productId);

    @Query("SELECT p.id.productId, p.id.factoryAddress, p.timeFormulaForDelivery FROM ProductDeliveryTime p WHERE p.id.productId IN :productIds")
    List<List<String>> getAllPossibleStandardDeliveryTimesOfGivenProducts(@Param("productIds") List<String> productIds);

    @Query("SELECT p.id.productId, p.id.factoryAddress, p.timeFormulaForPremiumDelivery FROM ProductDeliveryTime p WHERE p.id.productId IN :productIds")
    List<List<String>> getAllPossiblePremiumDeliveryTimesOfGivenProducts(@Param("productIds") List<String> productIds);
}
