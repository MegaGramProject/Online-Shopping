package megagram.springBootBackend5;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import megagram.springBootBackend5.mysqlModels.ProductDeliveryTime;
import megagram.springBootBackend5.mysqlModels.ProductDeliveryTimeId;
import megagram.springBootBackend5.mysqlModels.ShoppingCart;
import megagram.springBootBackend5.mysqlModels.ShoppingCartId;
import megagram.springBootBackend5.mysqlRepositories.ProductDeliveryTimeRepository;
import megagram.springBootBackend5.mysqlRepositories.ShoppingCartRepository;
import megagram.springBootBackend5.psqlModels.WebsiteRatingAndReview;
import megagram.springBootBackend5.psqlRepositories.WebsiteRatingAndReviewRepository;



@RestController
@CrossOrigin({"http://localhost:8024"})
public class graphqlController {

    public graphqlController() {
    }
    
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductDeliveryTimeRepository productDeliveryTimeRepository;

    @Autowired
    private WebsiteRatingAndReviewRepository websiteRatingAndReviewRepository;

    @QueryMapping
    public List<ShoppingCart> getAllShoppingCarts() {
        List<ShoppingCart> allShoppingCarts = shoppingCartRepository.findAll();
        return allShoppingCarts;
    }
    
    @QueryMapping
    public List<ShoppingCart> getAllShoppingCartItemsOfUser(@Argument String username) {
        List<ShoppingCart> allShoppingCartItemsOfUser = shoppingCartRepository.findByUsername(username);
        return allShoppingCartItemsOfUser;
    }

    @MutationMapping
    public ShoppingCart addShoppingCartItem(@Argument String username, @Argument String productId, @Argument String optionsChosen) {
        ShoppingCartId newShoppingCartItemId = new ShoppingCartId(username, productId);
        ShoppingCart newShoppingCartItem = new ShoppingCart(newShoppingCartItemId, optionsChosen);
        shoppingCartRepository.save(newShoppingCartItem);
        return newShoppingCartItem;
    }

    @MutationMapping
    public ShoppingCart editShoppingCartItem(@Argument String username, @Argument String productId, @Argument String newOptionsChosen) {
        Optional<ShoppingCart> optionalShoppingCartItemToEdit = shoppingCartRepository.findById(new ShoppingCartId(username, productId));
        if (!optionalShoppingCartItemToEdit.isPresent()) {
            return null;
        }
        ShoppingCart shoppingCartItemToEdit = optionalShoppingCartItemToEdit.get();
        shoppingCartItemToEdit.setOptionsChosen(newOptionsChosen);
        shoppingCartRepository.save(shoppingCartItemToEdit);
        return shoppingCartItemToEdit;
    }

    @MutationMapping
    public Boolean deleteShoppingCartItem(@Argument String username, @Argument String productId) {
        Optional<ShoppingCart> optionalShoppingCartItemToDelete = shoppingCartRepository.findById(new ShoppingCartId(username, productId));
        if (!optionalShoppingCartItemToDelete.isPresent()) {
            return false;
        }
        ShoppingCart shoppingCartItemToDelete = optionalShoppingCartItemToDelete.get();
        shoppingCartRepository.delete(shoppingCartItemToDelete);
        return true;
    }

    @QueryMapping
    public List<ProductDeliveryTime> getAllProductDeliveryTimes() {
        List<ProductDeliveryTime> allProductDeliveryTimes = productDeliveryTimeRepository.findAll();
        return allProductDeliveryTimes;
    }

    @QueryMapping
    public List<ProductDeliveryTime> getAllProductDeliveryTimesOfProduct(@Argument String productId) {
        List<ProductDeliveryTime> allProductDeliveryTimesOfProduct = productDeliveryTimeRepository.findById_ProductId(productId);
        return allProductDeliveryTimesOfProduct;
    }

    @MutationMapping
    public ProductDeliveryTime addProductDeliveryTime(@Argument String productId, @Argument String factoryAddress, @Argument String timeFormulaForDelivery, @Argument String timeFormulaForPremiumDelivery) {
        ProductDeliveryTimeId newProductDeliveryTimeId = new ProductDeliveryTimeId(productId, factoryAddress);
        ProductDeliveryTime newProductDeliveryTime = new ProductDeliveryTime(newProductDeliveryTimeId, timeFormulaForDelivery, timeFormulaForPremiumDelivery);
        productDeliveryTimeRepository.save(newProductDeliveryTime);
        return newProductDeliveryTime;
    }

    @MutationMapping
    public ProductDeliveryTime editProductDeliveryTime(@Argument String productId, @Argument String factoryAddress, @Argument String newTimeFormulaForDelivery, @Argument String newTimeFormulaForPremiumDelivery) {
        Optional<ProductDeliveryTime> optionalProductDeliveryTimeToEdit = productDeliveryTimeRepository.findById(new ProductDeliveryTimeId(productId, factoryAddress));
        if (!optionalProductDeliveryTimeToEdit.isPresent()) {
            return null;
        }
        ProductDeliveryTime productDeliveryTimeToEdit = optionalProductDeliveryTimeToEdit.get();
        if(newTimeFormulaForDelivery!=null) {
            productDeliveryTimeToEdit.setTimeFormulaForDelivery(newTimeFormulaForDelivery);
        }
        if(newTimeFormulaForPremiumDelivery!=null) {
            productDeliveryTimeToEdit.setTimeFormulaForPremiumDelivery(newTimeFormulaForPremiumDelivery);
        }
        productDeliveryTimeRepository.save(productDeliveryTimeToEdit);
        return productDeliveryTimeToEdit;
    }

    @MutationMapping
    public Boolean deleteProductDeliveryTime(@Argument String productId, @Argument String factoryAddress) {
        Optional<ProductDeliveryTime> optionalProductDeliveryTimeToDelete = productDeliveryTimeRepository.findById(new ProductDeliveryTimeId(productId, factoryAddress));
        if (!optionalProductDeliveryTimeToDelete.isPresent()) {
            return false;
        }
        ProductDeliveryTime productDeliveryTimeToDelete = optionalProductDeliveryTimeToDelete.get();
        productDeliveryTimeRepository.delete(productDeliveryTimeToDelete);
        return true;
    }

    @QueryMapping
    public List<WebsiteRatingAndReview> getAllWebsiteRatingsAndReviews() {
        List<WebsiteRatingAndReview> allWebsiteRatingsAndReviews = websiteRatingAndReviewRepository.findAll();
        return allWebsiteRatingsAndReviews;
    }

    @QueryMapping
    public WebsiteRatingAndReview getWebsiteRatingAndReviewOfUser(@Argument String customer_username) {
        Optional<WebsiteRatingAndReview> optionalWebsiteRatingAndReviewOfUser = websiteRatingAndReviewRepository.findByCustomerUsername(customer_username);
        if(!optionalWebsiteRatingAndReviewOfUser.isPresent()) {
            return null;
        }
        return optionalWebsiteRatingAndReviewOfUser.get();
    }

    @MutationMapping
    public WebsiteRatingAndReview addWebsiteRatingAndReview(@Argument String customer_username, @Argument int rating, @Argument String review, @Argument Date date_time) {
        WebsiteRatingAndReview newWebsiteRatingAndReview = new WebsiteRatingAndReview(customer_username, rating, review, date_time, false);
        websiteRatingAndReviewRepository.save(newWebsiteRatingAndReview);
        return newWebsiteRatingAndReview;
    }

    @MutationMapping
    public WebsiteRatingAndReview editWebsiteRatingAndReview(@Argument String customer_username, @Argument Integer rating, @Argument String review, @Argument Date date_time) {
        Optional<WebsiteRatingAndReview> optionalWebsiteRatingAndReviewOfUser = websiteRatingAndReviewRepository.findByCustomerUsername(customer_username);
        if(!optionalWebsiteRatingAndReviewOfUser.isPresent()) {
            return null;
        }
        WebsiteRatingAndReview websiteRatingAndReviewToEdit = optionalWebsiteRatingAndReviewOfUser.get();
        Boolean hasEditBeenMade = false;
        if(rating!=null) {
            websiteRatingAndReviewToEdit.setRating(rating);
            hasEditBeenMade = true;
        }
        if(review!=null) {
            websiteRatingAndReviewToEdit.setReview(review);
            hasEditBeenMade = true;
        }
        if(hasEditBeenMade) {
            websiteRatingAndReviewToEdit.setDateTime(date_time);
            websiteRatingAndReviewToEdit.setIsEdited(true);
        }
        websiteRatingAndReviewRepository.save(websiteRatingAndReviewToEdit);
        return websiteRatingAndReviewToEdit;
    }

    @MutationMapping
    public Boolean deleteWebsiteRatingAndReview(@Argument String customer_username) {
        Optional<WebsiteRatingAndReview> optionalWebsiteRatingAndReviewOfUser = websiteRatingAndReviewRepository.findByCustomerUsername(customer_username);
        if(!optionalWebsiteRatingAndReviewOfUser.isPresent()) {
            return false;
        }
        WebsiteRatingAndReview websiteRatingAndReviewToDelete = optionalWebsiteRatingAndReviewOfUser.get();
        websiteRatingAndReviewRepository.delete(websiteRatingAndReviewToDelete);
        return true;
    }

}
