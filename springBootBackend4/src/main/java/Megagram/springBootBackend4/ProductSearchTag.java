package Megagram.springBootBackend4;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "productSearchTags")
public class ProductSearchTag {

    private String productId;
    private String[] tags;

    public ProductSearchTag() {
    }

    public ProductSearchTag(String productId, String[] tags) {
        this.productId = productId;
        this.tags = tags;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }
    public void setTags(String[] tags) {
        this.tags = tags;
    }

    public String getProductId() {
        return this.productId;
    }

    public String[] getTags() {
        return this.tags;
    }
    
}
