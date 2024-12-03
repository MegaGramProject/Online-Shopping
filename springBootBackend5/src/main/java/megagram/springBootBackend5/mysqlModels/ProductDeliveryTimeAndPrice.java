package megagram.springBootBackend5.mysqlModels;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "productDeliveryTimesAndPrices")
public class ProductDeliveryTimeAndPrice {

    @EmbeddedId
    private ProductDeliveryTimeAndPriceId id;

    private String timeFormulaForDelivery;

    private String timeFormulaForPremiumDelivery;

    private String SHDPriceFormula;

    private double SHDPriceSavedWithPremium;

    private double taxRate;

    public ProductDeliveryTimeAndPrice() {
    }

    public ProductDeliveryTimeAndPrice(ProductDeliveryTimeAndPriceId id, String timeFormulaForDelivery, String timeFormulaForPremiumDelivery,
    String SHDPriceFormula, double SHDPriceSavedWithPremium, double taxRate) {
        this.id = id;
        this.timeFormulaForDelivery = timeFormulaForDelivery;
        this.timeFormulaForPremiumDelivery = timeFormulaForPremiumDelivery;
        this.SHDPriceFormula = SHDPriceFormula;
        this.SHDPriceSavedWithPremium = SHDPriceSavedWithPremium;
        this.taxRate = taxRate;
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

    public String getSHDPriceFormula() {
        return this.SHDPriceFormula;
    }

    public void setSHDPriceFormula(String SHDPriceFormula) {
        this.SHDPriceFormula = SHDPriceFormula;
    }

    public double getSHDPriceSavedWithPremium() {
        return this.SHDPriceSavedWithPremium;
    }

    public void setSHDPriceSavedWithPremium(double SHDPriceSavedWithPremium) {
        this.SHDPriceSavedWithPremium = SHDPriceSavedWithPremium;
    }

    public double getTaxRate() {
        return this.taxRate;
    }

    public void setTaxRate(double taxRate) {
        this.taxRate = taxRate;
    }

}
