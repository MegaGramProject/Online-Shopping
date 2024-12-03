package megagram.springBootBackend5.mysqlModels;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class ProductDeliveryTimeAndPriceId implements Serializable {
    
    private String productId;
    private String factoryAddress;

    public ProductDeliveryTimeAndPriceId() {}

    public ProductDeliveryTimeAndPriceId(String productId, String factoryAddress) {
        this.productId = productId;
        this.factoryAddress = factoryAddress;
    }

    public String getProductId() {
        return this.productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getFactoryAddress() {
        return this.factoryAddress;
    }

    public void setFactoryAddress(String factoryAddress) {
        this.factoryAddress = factoryAddress;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.productId, this.factoryAddress);
    }
}
