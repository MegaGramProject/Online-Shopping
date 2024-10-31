package Megagram.springBootBackend4;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class ShopSearchId implements Serializable {
    
    private String search;
    private String searcherUsername;
    private String searchCategory;

    public ShopSearchId() {}

    public ShopSearchId(String search, String searcherUsername, String searchCategory) {
        this.search = search;
        this.searcherUsername = searcherUsername;
        this.searchCategory = searchCategory;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public String getSearcherUsername() {
        return searcherUsername;
    }

    public void setSearcherUsername(String searcherUsername) {
        this.searcherUsername = searcherUsername;
    }

    public String getSearchCategory() {
        return searchCategory;
    }

    public void setSearchCategory(String searchCategory) {
        this.searchCategory = searchCategory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ShopSearchId)) return false;
        ShopSearchId that = (ShopSearchId) o;
        return search.equals(that.search) &&
            searcherUsername.equals(that.searcherUsername) &&
            searchCategory.equals(that.searchCategory);
}

    @Override
    public int hashCode() {
        return Objects.hash(search, searcherUsername, searchCategory);
    }
}
