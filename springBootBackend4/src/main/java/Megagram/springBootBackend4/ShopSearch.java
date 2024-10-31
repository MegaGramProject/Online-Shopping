package Megagram.springBootBackend4;

import java.util.Date;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "shopSearches")
public class ShopSearch {

    @EmbeddedId
    private ShopSearchId id;

    private Date dateTime;

    public ShopSearch() {
    }

    public ShopSearch(ShopSearchId id, Date dateTime) {
        this.id = id;
        this.dateTime = dateTime;
    }

    public Date getDateTime() {
        return this.dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public String getSearch() {
        return this.id.getSearch();
    }

    public String getSearcherUsername() {
        return this.id.getSearcherUsername();
    }

    public String getSearchCategory() {
        return this.id.getSearchCategory();
    }
}
