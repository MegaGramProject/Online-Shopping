package megagram.springBootBackend5.mysqlRepositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import megagram.springBootBackend5.mysqlModels.ProductDeliveryTimeAndPrice;
import megagram.springBootBackend5.mysqlModels.ProductDeliveryTimeAndPriceId;

public interface ProductDeliveryTimeAndPriceRepository extends JpaRepository<ProductDeliveryTimeAndPrice, ProductDeliveryTimeAndPriceId> {
    Optional<ProductDeliveryTimeAndPrice> findById(ProductDeliveryTimeAndPriceId id);
    List<ProductDeliveryTimeAndPrice> findById_ProductId(String productId);

    @Query("SELECT p.id.productId, p.id.factoryAddress, p.timeFormulaForDelivery FROM ProductDeliveryTimeAndPrice p WHERE p.id.productId IN :productIds")
    List<List<String>> getAllPossibleStandardDeliveryTimesOfGivenProducts(@Param("productIds") List<String> productIds);

    @Query("SELECT p.id.productId, p.id.factoryAddress, p.timeFormulaForPremiumDelivery FROM ProductDeliveryTimeAndPrice p WHERE p.id.productId IN :productIds")
    List<List<String>> getAllPossiblePremiumDeliveryTimesOfGivenProducts(@Param("productIds") List<String> productIds);

    @Query("SELECT p.id.productId, p.id.factoryAddress, p.timeFormulaForDelivery, p.SHDPriceFormula, p.taxRate FROM ProductDeliveryTimeAndPrice p WHERE p.id.productId IN :productIds")
    List<List<Object>> getAllStandardDeliveryTimesAndPricesOfProducts(@Param("productIds") List<String> productIds);

    @Query("SELECT p.id.productId, p.id.factoryAddress, p.timeFormulaForPremiumDelivery, p.SHDPriceFormula, p.SHDPriceSavedWithPremium, p.taxRate FROM ProductDeliveryTimeAndPrice p WHERE p.id.productId IN :productIds")
    List<List<Object>> getAllPremiumDeliveryTimesAndPricesOfProducts(@Param("productIds") List<String> productIds);

    @Query("SELECT p.id.factoryAddress, p.timeFormulaForDelivery, p.SHDPriceFormula, p.taxRate FROM ProductDeliveryTimeAndPrice p WHERE p.id.productId = :productId")
    List<List<Object>> getAllPossibleStandardDeliveryTimesAndPricesOfSpecificProduct(@Param("productId") String productId);

    @Query("SELECT p.id.factoryAddress, p.timeFormulaForPremiumDelivery, p.SHDPriceFormula, p.SHDPriceSavedWithPremium, p.taxRate FROM ProductDeliveryTimeAndPrice p WHERE p.id.productId = :productId")
    List<List<Object>> getAllPossiblePremiumDeliveryTimesAndPricesOfSpecificProduct(@Param("productId") String productId);
}
