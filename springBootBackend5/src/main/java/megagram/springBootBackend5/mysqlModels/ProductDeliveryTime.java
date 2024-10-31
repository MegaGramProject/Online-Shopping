package megagram.springBootBackend5.mysqlModels;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "productDeliveryTimes")
public class ProductDeliveryTime {

    @EmbeddedId
    private ProductDeliveryTimeId id;

    private String timeFormulaForDelivery;

    private String timeFormulaForPremiumDelivery;

    public ProductDeliveryTime() {
    }

    public ProductDeliveryTime(ProductDeliveryTimeId id, String timeFormulaForDelivery, String timeFormulaForPremiumDelivery) {
        this.id = id;
        this.timeFormulaForDelivery = timeFormulaForDelivery;
        this.timeFormulaForPremiumDelivery = timeFormulaForPremiumDelivery;
    }

    public String getProductId() {
        return this.id.getProductId();
    }

    public void setProductId(String productId) {
        this.id.setProductId(productId);
    }

    public String getFactoryAddress() {
        return this.id.getFactoryAddress();
    }

    public void setFactoryAddress(String factoryAddress) {
        this.id.setFactoryAddress(factoryAddress);
    }

    public String getTimeFormulaForDelivery() {
        return this.timeFormulaForDelivery;
    }

    public void setTimeFormulaForDelivery(String timeFormulaForDelivery) {
        this.timeFormulaForDelivery = timeFormulaForDelivery;
    }

    public String getTimeFormulaForPremiumDelivery() {
        return this.timeFormulaForPremiumDelivery;
    }

    public void setTimeFormulaForPremiumDelivery(String timeFormulaForPremiumDelivery) {
        this.timeFormulaForPremiumDelivery = timeFormulaForPremiumDelivery;
    }

}
