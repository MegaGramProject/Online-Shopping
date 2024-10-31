package megagram.springBootBackend5.psqlModels;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "website_ratings_and_reviews")
public class WebsiteRatingAndReview {
    @Id
    private String customer_username;

    private int rating;

    private String review;

    private Date date_time;

    private Boolean is_edited;


    public WebsiteRatingAndReview() {
    }

    public WebsiteRatingAndReview(String customer_username, int rating, String review, Date date_time, Boolean is_edited) {
        this.customer_username = customer_username;
        this.rating = rating;
        this.review = review;
        this.date_time = date_time;
        this.is_edited = is_edited;
    }

    public String getCustomerUsername() {
        return this.customer_username;
    }

    public void setCustomerUsername(String customer_username) {
        this.customer_username = customer_username;
    }

    public int getRating() {
        return this.rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReview() {
        return this.review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Date getDateTime() {
        return this.date_time;
    }

    public void setDateTime(Date date_time) {
        this.date_time = date_time;
    }

    public Boolean getIsEdited() {
        return this.is_edited;
    }

    public void setIsEdited(Boolean is_edited) {
        this.is_edited = is_edited;
    }

}
