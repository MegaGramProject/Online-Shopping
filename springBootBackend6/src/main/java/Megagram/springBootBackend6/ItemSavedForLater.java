package Megagram.springBootBackend6;

import java.util.HashMap;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "itemsSavedForLater")
public class ItemSavedForLater {

    @Id
    private ObjectId id;
    private String username;
    private String productId;
    private HashMap<String, Integer> options;

    public ItemSavedForLater() {
    }

    public ItemSavedForLater(ObjectId id, String username, String productId, HashMap<String, Integer> options) {
        this.id = id;
        this.username = username;
        this.productId = productId;
        this.options = options;
    }

    public ItemSavedForLater(String username, String productId, HashMap<String, Integer> options) {
        this.username = username;
        this.productId = productId;
        this.options = options;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public HashMap<String, Integer> getOptions() {
        return options;
    }

    public void setOptions(HashMap<String, Integer> options) {
        this.options = options;
    }
}
