package megagram.springBootBackend5.mysqlModels;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "shoppingCarts")
public class ShoppingCart {

    @EmbeddedId
    private ShoppingCartId id;

    @Column(columnDefinition = "json")
    private String optionsChosen;

    public ShoppingCart() {
    }

    public ShoppingCart(ShoppingCartId id, String optionsChosen) {
        this.id = id;
        this.optionsChosen = optionsChosen;
    }

    public String getUsername() {
        return this.id.getUsername();
    }

    public void setUsername(String username) {
        this.id.setUsername(username);
    }

    public String getProductId() {
        return this.id.getProductId();
    }

    public void setProductId(String productId) {
        this.id.setProductId(productId);
    }

    public String getOptionsChosen() {
        return this.optionsChosen;
    }

    public void setOptionsChosen(String optionsChosen) {
        this.optionsChosen = optionsChosen;
    }

}
