package megagram.springBootBackend5.psqlRepositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import megagram.springBootBackend5.psqlModels.WebsiteRatingAndReview;


public interface WebsiteRatingAndReviewRepository extends JpaRepository<WebsiteRatingAndReview, String> {
        @Query("SELECT w FROM WebsiteRatingAndReview w WHERE w.customer_username = :customer_username")
        Optional<WebsiteRatingAndReview> findByCustomerUsername(@Param("customer_username") String customer_username);
}
