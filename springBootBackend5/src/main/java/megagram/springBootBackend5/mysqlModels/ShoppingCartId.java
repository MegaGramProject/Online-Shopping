package megagram.springBootBackend5.mysqlModels;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class ShoppingCartId implements Serializable {
    
    
    private String username;
    private String productId;

    public ShoppingCartId() {}

    public ShoppingCartId(String username, String productId) {
        this.username = username;
        this.productId = productId;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProductId() {
        return this.productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.username, this.productId);
    }
}
