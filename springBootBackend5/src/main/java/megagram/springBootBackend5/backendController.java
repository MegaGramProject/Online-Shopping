package megagram.springBootBackend5;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import megagram.springBootBackend5.mysqlModels.ProductDeliveryTimeAndPrice;
import megagram.springBootBackend5.mysqlModels.ProductDeliveryTimeAndPriceId;
import megagram.springBootBackend5.mysqlModels.ShoppingCart;
import megagram.springBootBackend5.mysqlRepositories.ProductDeliveryTimeAndPriceRepository;
import megagram.springBootBackend5.mysqlRepositories.ShoppingCartRepository;
import megagram.springBootBackend5.psqlModels.WebsiteRatingAndReview;
import megagram.springBootBackend5.psqlRepositories.WebsiteRatingAndReviewRepository;




@RestController
public class backendController {

    public backendController() {
    }
    
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private ProductDeliveryTimeAndPriceRepository productDeliveryTimeAndPriceRepository;

    @Autowired
    private WebsiteRatingAndReviewRepository websiteRatingAndReviewRepository;

    @QueryMapping
    public List<ShoppingCart> getAllShoppingCartItems() {
        List<ShoppingCart> allShoppingCarts = shoppingCartRepository.findAll();
        return allShoppingCarts;
    }
    
    @QueryMapping
    public List<ShoppingCart> getAllShoppingCartItemsOfUser(@Argument String username) {
        List<ShoppingCart> allShoppingCartItemsOfUser = shoppingCartRepository.findByUsername(username);
        return allShoppingCartItemsOfUser;
    }

    @MutationMapping
    public ShoppingCart addShoppingCartItem(@Argument String username, @Argument String productId, @Argument int quantity, @Argument String options) {
        ShoppingCart newShoppingCartItem = new ShoppingCart(username, productId, quantity, options);
        shoppingCartRepository.save(newShoppingCartItem);
        return newShoppingCartItem;
    }

    @MutationMapping
    public ShoppingCart editShoppingCartItem(@Argument int id, @Argument int newQuantity) {
        Optional<ShoppingCart> optionalShoppingCartItemToEdit = shoppingCartRepository.findById(id);
        if (!optionalShoppingCartItemToEdit.isPresent()) {
            return null;
        }
        ShoppingCart shoppingCartItemToEdit = optionalShoppingCartItemToEdit.get();
        shoppingCartItemToEdit.setQuantity(newQuantity);
        shoppingCartRepository.save(shoppingCartItemToEdit);
        return shoppingCartItemToEdit;
    }

    @MutationMapping
    public Boolean deleteShoppingCartItem(@Argument int id) {
        Optional<ShoppingCart> optionalShoppingCartItemToDelete = shoppingCartRepository.findById(id);
        if (!optionalShoppingCartItemToDelete.isPresent()) {
            return false;
        }
        ShoppingCart shoppingCartItemToDelete = optionalShoppingCartItemToDelete.get();
        shoppingCartRepository.delete(shoppingCartItemToDelete);
        return true;
    }

    @PostMapping("/getDataOfManyShoppingCartItems")
    public ResponseEntity<List<ShoppingCart>> getDataOfManyShoppingCartItems(@RequestBody Map<String, List<Integer>> request) {
        if(request.containsKey("ids")) {
            List<Integer> ids = request.get("ids");
            List<ShoppingCart> output = shoppingCartRepository.findByListOfIds(ids);
            return new ResponseEntity<>(output, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteManyItemsFromShoppingCart")
    public ResponseEntity<Integer> deleteManyItemsFromShoppingCart(@RequestBody Map<String, List<Integer>> request) {
        if(request.containsKey("ids")) {
            List<Integer> ids = request.get("ids");
            int numberOfDeletedRows = shoppingCartRepository.deleteByListOfIds(ids);
            return new ResponseEntity<>(numberOfDeletedRows, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/addManyShoppingCartItems")
    public ResponseEntity<Integer> addManyShoppingCartItems(@RequestBody Map<String, List<ShoppingCart>> request) {
        if(request.containsKey("listOfCartItemsToAdd")) {
            List<ShoppingCart> listOfCartItemsToAdd = request.get("listOfCartItemsToAdd");
            List<ShoppingCart> savedItems = shoppingCartRepository.saveAll(listOfCartItemsToAdd);
            return new ResponseEntity<>(savedItems.size(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @QueryMapping
    public List<ProductDeliveryTimeAndPrice> getAllProductDeliveryTimesAndPrices() {
        List<ProductDeliveryTimeAndPrice> allProductDeliveryTimesAndPrices = productDeliveryTimeAndPriceRepository.findAll();
        return allProductDeliveryTimesAndPrices;
    }

    @QueryMapping
    public List<ProductDeliveryTimeAndPrice> getAllProductDeliveryTimesAndPricesOfProduct(@Argument String productId) {
        List<ProductDeliveryTimeAndPrice> allProductDeliveryTimesAndPricesOfProduct = productDeliveryTimeAndPriceRepository.findById_ProductId(productId);
        return allProductDeliveryTimesAndPricesOfProduct;
    }

    @PostMapping("/getFastestDeliveryTimesForProducts")
    public ResponseEntity<HashMap<String, Double>> getFastestDeliveryTimesForProducts(@RequestBody Map<String, Object> request) {
        if(request.containsKey("hasPremium") && request.containsKey("address") && request.containsKey("productIds")) {
            Boolean hasPremium = (Boolean) request.get("hasPremium");
            String destinationAddress = (String) request.get("address");
            List<String> productIds = (List<String>) request.get("productIds");
            List<List<String>> allPossibleDeliveryTimesOfGivenProducts;
            if(!hasPremium) {
                allPossibleDeliveryTimesOfGivenProducts = productDeliveryTimeAndPriceRepository.getAllPossibleStandardDeliveryTimesOfGivenProducts(productIds);
            }
            else {
                allPossibleDeliveryTimesOfGivenProducts =  productDeliveryTimeAndPriceRepository.getAllPossiblePremiumDeliveryTimesOfGivenProducts(productIds);
            }

            HashMap<String, Double> fastestDeliveryTimesForProducts = new HashMap<String, Double>();
            /*
            the dict above is structured as such: the keys are productIds
            and values are minimum number of hours it takes to deliver the product to the
            given destinationAddress.
            */

            for(List<String> productDeliveryTime : allPossibleDeliveryTimesOfGivenProducts) {
                String productId = productDeliveryTime.get(0);
                String factoryAddress = productDeliveryTime.get(1);
                String timeFormulaForDelivery = productDeliveryTime.get(2);
                //for now, instead of using paid-distance-API, number of hours between address and
                //factory will be deduced randomly
                double deliveryTimeInHours = calculateDeliveryTime(factoryAddress, destinationAddress, timeFormulaForDelivery);
                Double fastestDeliveryTimeForCurrentProductId = fastestDeliveryTimesForProducts.get(productId);
                if(fastestDeliveryTimeForCurrentProductId==null ||
                fastestDeliveryTimeForCurrentProductId > deliveryTimeInHours) {
                    fastestDeliveryTimesForProducts.put(productId, deliveryTimeInHours);
                }
            }

            return new ResponseEntity<>(fastestDeliveryTimesForProducts, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/getFactoryAddressesAndShippingPricesAndTaxesAndShortestDeliveryTimesOfProducts")
    public ResponseEntity<HashMap<String, HashMap<String, Object>>> getShippingPricesAndTaxesAndShortestDeliveryTimesOfProducts(@RequestBody HashMap<String, Object> request) {
        if(request.containsKey("productIds") && request.containsKey("destinationAddress")) {
            List<String> productIds = (List<String>) request.get("productIds");
            String destinationAddress = (String) request.get("destinationAddress");
            boolean hasPremium = (boolean) request.get("hasPremium");

            List<List<Object>> allDeliveryTimesAndPricesOfProducts;
            if(!hasPremium) {
                allDeliveryTimesAndPricesOfProducts = productDeliveryTimeAndPriceRepository.getAllStandardDeliveryTimesAndPricesOfProducts(productIds);
            }
            else {
                allDeliveryTimesAndPricesOfProducts =  productDeliveryTimeAndPriceRepository.getAllPremiumDeliveryTimesAndPricesOfProducts(productIds);
            }

            HashMap<String, HashMap<String, Object>> shdPriceAndTaxAndQuickestDeliveryTimeForProducts = new HashMap<String, HashMap<String, Object>>();
            /*
                the dict above is structured as such: the keys are productIds
                and values are dicts such as the following: {
                    factoryAddress: "1234 Industrial Park Road, Building 5, Suite 200, Springfield, IL 62704, United States",
                    fastestDeliveryTimeInHours: 120,
                    shdPrice: 123,
                    shdPriceSavedWithPremium: 12, //this key exists if hasPremium is true
                    taxRate: 5.69
                }
            */

            for(List<Object> productDeliveryTimeAndPrice : allDeliveryTimesAndPricesOfProducts) {
                String productId = (String) productDeliveryTimeAndPrice.get(0);
                String factoryAddress = (String) productDeliveryTimeAndPrice.get(1);
                String timeFormulaForDelivery = (String) productDeliveryTimeAndPrice.get(2);
                String shdPriceFormula = (String) productDeliveryTimeAndPrice.get(3);
                Double shdPriceSavedWithPremium = 0.0;
                Double taxRate = 0.0;
                if(hasPremium) {
                    shdPriceSavedWithPremium = (Double) productDeliveryTimeAndPrice.get(4);
                    taxRate = (Double) productDeliveryTimeAndPrice.get(5);
                }
                else {
                    taxRate = (Double) productDeliveryTimeAndPrice.get(4);
                }

                double deliveryTimeInHours = calculateDeliveryTime(factoryAddress, destinationAddress, timeFormulaForDelivery);
                double shdPrice = calculateSHDPrice(factoryAddress, destinationAddress, shdPriceFormula);
                HashMap<String, Object> relevantProductInfo = new HashMap<String, Object>();
                relevantProductInfo.put("fastestDeliveryTimeInHours", deliveryTimeInHours);
                relevantProductInfo.put("shdPrice", shdPrice);
                if(hasPremium) {
                    relevantProductInfo.put("shdPriceSavedWithPremium", shdPriceSavedWithPremium);
                }
                relevantProductInfo.put("taxRate", taxRate);
                relevantProductInfo.put("factoryAddress", factoryAddress);

                if(!shdPriceAndTaxAndQuickestDeliveryTimeForProducts.containsKey(productId)) {
                    shdPriceAndTaxAndQuickestDeliveryTimeForProducts.put(productId, relevantProductInfo);
                }
                else {
                    double fastestDeliveryTimeInHours = (double) shdPriceAndTaxAndQuickestDeliveryTimeForProducts.get(productId).get("fastestDeliveryTimeInHours");
                    if(deliveryTimeInHours < fastestDeliveryTimeInHours) {
                        shdPriceAndTaxAndQuickestDeliveryTimeForProducts.put(productId, relevantProductInfo);
                    }
                }
            }

            return new ResponseEntity<>(shdPriceAndTaxAndQuickestDeliveryTimeForProducts, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private double calculateDeliveryTime(String factoryAddress, String destinationAddress, String deliveryTimeFormula) {
        /*
        temporary solution
         */
        Random random = new Random();
        return 7 + random.nextFloat() * 550;
    }

    public double calculateSHDPrice(String factoryAddress, String destinationAddress, String SHDPriceFormula) {
        /*
        temporary solution
         */
        Random random = new Random();
        return 1.50 + random.nextFloat() * 3;
    }

    @MutationMapping
    public ProductDeliveryTimeAndPrice addProductDeliveryTimeAndPrice(@Argument String productId, @Argument String factoryAddress, @Argument String timeFormulaForDelivery, @Argument String timeFormulaForPremiumDelivery,
    @Argument String SHDPriceFormula, @Argument double SHDPriceSavedWithPremium, @Argument double taxRate) {
        ProductDeliveryTimeAndPriceId newProductDeliveryTimeAndPriceId = new ProductDeliveryTimeAndPriceId(productId, factoryAddress);
        ProductDeliveryTimeAndPrice newProductDeliveryTimeAndPrice = new ProductDeliveryTimeAndPrice(newProductDeliveryTimeAndPriceId, timeFormulaForDelivery, timeFormulaForPremiumDelivery, SHDPriceFormula, SHDPriceSavedWithPremium, taxRate);
        productDeliveryTimeAndPriceRepository.save(newProductDeliveryTimeAndPrice);
        return newProductDeliveryTimeAndPrice;
    }

    @MutationMapping
    public ProductDeliveryTimeAndPrice editProductDeliveryTimeAndPrice(@Argument String productId, @Argument String factoryAddress, @Argument String newTimeFormulaForDelivery, @Argument String newTimeFormulaForPremiumDelivery,
    @Argument String newSHDPriceFormula, @Argument Double newSHDPriceSavedWithPremium, @Argument Double newTaxRate) {
        Optional<ProductDeliveryTimeAndPrice> optionalProductDeliveryTimeAndPriceToEdit = productDeliveryTimeAndPriceRepository.findById(new ProductDeliveryTimeAndPriceId(productId, factoryAddress));
        if (!optionalProductDeliveryTimeAndPriceToEdit.isPresent()) {
            return null;
        }
        ProductDeliveryTimeAndPrice productDeliveryTimeAndPriceToEdit = optionalProductDeliveryTimeAndPriceToEdit.get();
        if(newTimeFormulaForDelivery!=null) {
            productDeliveryTimeAndPriceToEdit.setTimeFormulaForDelivery(newTimeFormulaForDelivery);
        }
        if(newTimeFormulaForPremiumDelivery!=null) {
            productDeliveryTimeAndPriceToEdit.setTimeFormulaForPremiumDelivery(newTimeFormulaForPremiumDelivery);
        }
        if(newSHDPriceFormula!=null) {
            productDeliveryTimeAndPriceToEdit.setSHDPriceFormula(newSHDPriceFormula);
        }
        if(newSHDPriceSavedWithPremium!=null) {
            productDeliveryTimeAndPriceToEdit.setSHDPriceSavedWithPremium(newSHDPriceSavedWithPremium);
        }
        if(newTaxRate!=null) {
            productDeliveryTimeAndPriceToEdit.setTaxRate(newTaxRate);
        }
        productDeliveryTimeAndPriceRepository.save(productDeliveryTimeAndPriceToEdit);
        return productDeliveryTimeAndPriceToEdit;
    }

    @MutationMapping
    public Boolean deleteProductDeliveryTimeAndPrice(@Argument String productId, @Argument String factoryAddress) {
        Optional<ProductDeliveryTimeAndPrice> optionalProductDeliveryTimeAndPriceToDelete = productDeliveryTimeAndPriceRepository.findById(new ProductDeliveryTimeAndPriceId(productId, factoryAddress));
        if (!optionalProductDeliveryTimeAndPriceToDelete.isPresent()) {
            return false;
        }
        ProductDeliveryTimeAndPrice productDeliveryTimeAndPriceToDelete = optionalProductDeliveryTimeAndPriceToDelete.get();
        productDeliveryTimeAndPriceRepository.delete(productDeliveryTimeAndPriceToDelete);
        return true;
    }

    @PostMapping("/getLaterSchedulingOptionsForProduct")
    public ResponseEntity<HashMap<String, Object>[]> getLaterSchedulingOptionsForProduct(@RequestBody HashMap<String, Object> request) {
        if(request.containsKey("productId") && request.containsKey("defaultDeliveryDate") && request.containsKey("defaultSHDPrice") &&
        request.containsKey("defaultTax") && request.containsKey("destinationAddress")) {
            String productId = (String) request.get("productId");
            List<Object> defaultDeliveryDate = (List<Object>) request.get("defaultDeliveryDate");
            /*
                an example for a value above is ["Monday", "Nov 25", 2025]
             */
            double defaultSHDPrice = (double) request.get("defaultSHDPrice");
            double defaultTax = (double) request.get("defaultTax");
            boolean hasPremium = false;
            double defaultSHDPriceSavedWithPremium = 0.0;
            if(request.containsKey("defaultSHDPriceSavedWithPremium")) {
                hasPremium = true;
                defaultSHDPriceSavedWithPremium = (double) request.get("defaultSHDPriceSavedWithPremium");
            }
            String destinationAddress = (String) request.get("destinationAddress");

            List<List<Object>> allDeliveryTimesAndPricesOfProduct;
            if(!hasPremium) {
                allDeliveryTimesAndPricesOfProduct = productDeliveryTimeAndPriceRepository.getAllPossibleStandardDeliveryTimesAndPricesOfSpecificProduct(productId);
            }
            else {
                allDeliveryTimesAndPricesOfProduct = productDeliveryTimeAndPriceRepository.getAllPossiblePremiumDeliveryTimesAndPricesOfSpecificProduct(productId);
            }

            List<List<Object>> nextFiveDatesAfterDefaultDeliveryDate = getNextFiveDatesAfterGivenDate(defaultDeliveryDate);

            @SuppressWarnings("unchecked")
            HashMap<String, Object>[] output = (HashMap<String, Object>[]) new HashMap[5];
            HashMap<String, Integer> dateStringToOutputIndexMappings = new HashMap<String, Integer>();
            /*
                in the dict above, keys are strings like "Thursday, Nov 28 2025" and values are integers like 0 or 1 or 2 or 3 or 4,
                which represent indices in output that correspond to the position in the output.

                the output is a list of 5 chronologically-ordered items(for each of the elements in nextFiveDatesAfterDefaultDeliveryDate),
                with each item looking something like this:
                    {
                        factoryAddress: "1234 Industrial Park Road, Building 5, Suite 200, Springfield, IL 62704, United States",
                        year: 2025,
                        weekday: 'Tuesday',
                        monthAndDay: 'Dec 3',
                        shdPriceDifference: '-9.5',
                        taxDifference: '+0.5',
                        shdPriceSavedWithPremiumDifference: '+1' (this key only is there if the hasPremium is true)
                        priceDifference: '-10',
                    }
             */
            for(int i=0; i<5; i++) {
                String dateAsString = nextFiveDatesAfterDefaultDeliveryDate.get(i).get(0) + ", " +
                nextFiveDatesAfterDefaultDeliveryDate.get(i).get(1)
                + " " + nextFiveDatesAfterDefaultDeliveryDate.get(i).get(2);

                dateStringToOutputIndexMappings.put(dateAsString, i);
            }

            for(List<Object> productDeliveryTimeAndPrice : allDeliveryTimesAndPricesOfProduct) {
                String factoryAddress = (String) productDeliveryTimeAndPrice.get(0);
                String timeFormulaForDelivery = (String) productDeliveryTimeAndPrice.get(1);
                String shdPriceFormula = (String) productDeliveryTimeAndPrice.get(2);
                double shdPriceSavedWithPremium = 0.0;
                double taxRate = 0.0;
                if(!hasPremium) {
                    taxRate = (double) productDeliveryTimeAndPrice.get(3);
                }
                else {
                    shdPriceSavedWithPremium = (double) productDeliveryTimeAndPrice.get(3);
                    taxRate = (double) productDeliveryTimeAndPrice.get(4);
                }

                double deliveryTimeInHours = calculateDeliveryTime(factoryAddress, destinationAddress, timeFormulaForDelivery);
                String dateStringForDelivery = getDateStringAfterNumHours(deliveryTimeInHours);

                if(dateStringToOutputIndexMappings.containsKey(dateStringForDelivery)) {
                    int outputIndex = dateStringToOutputIndexMappings.get(dateStringForDelivery);
                    double shdPrice = calculateSHDPrice(factoryAddress, destinationAddress, shdPriceFormula);
                    double tax = (taxRate/100)*shdPrice;
                    double shdPriceDifference = shdPrice-defaultSHDPrice;
                    double taxDifference = tax-defaultTax;
                    double shdPriceSavedWithPremiumDifference = 0;
                    if(hasPremium) {
                        shdPriceSavedWithPremiumDifference = shdPriceSavedWithPremium-defaultSHDPriceSavedWithPremium;
                    }
                    double priceDifference = 0;
                    priceDifference+=shdPriceDifference;
                    priceDifference+=taxDifference;
                    if(hasPremium) {
                        priceDifference-=shdPriceSavedWithPremiumDifference;
                    }
                    HashMap<String, Object> relevantInfo = new HashMap<String, Object>();
                    relevantInfo.put("shdPriceDifference", convertDifferenceFromDoubleToString(shdPriceDifference));
                    relevantInfo.put("taxDifference", convertDifferenceFromDoubleToString(taxDifference));
                    if(hasPremium) {
                        relevantInfo.put("shdPriceSavedWithPremium", convertDifferenceFromDoubleToString(shdPriceSavedWithPremium));
                    }
                    relevantInfo.put("priceDifference", convertDifferenceFromDoubleToString(priceDifference));
                    relevantInfo.put("factoryAddress", factoryAddress);
                    
                    for(int i = outputIndex; i<5; i++) {
                        if(output[i]==null) {
                            relevantInfo.put("weekday", nextFiveDatesAfterDefaultDeliveryDate.get(i).get(0));
                            relevantInfo.put("monthAndDay", nextFiveDatesAfterDefaultDeliveryDate.get(i).get(1));
                            relevantInfo.put("year", nextFiveDatesAfterDefaultDeliveryDate.get(i).get(2));
                            output[i] = new HashMap<String, Object>(relevantInfo);
                        }
                        else {
                            String stringifiedPriceDiff = (String) output[i].get("priceDifference");
                            double priceDiff = 0.0;
                            if(stringifiedPriceDiff.charAt(0) == '-') {
                                priceDiff = Double.parseDouble(stringifiedPriceDiff);
                            }
                            else {
                                priceDiff = Double.parseDouble(stringifiedPriceDiff.substring(1));
                            }
                            if(priceDifference<priceDiff) {
                                relevantInfo.put("weekday", nextFiveDatesAfterDefaultDeliveryDate.get(i).get(0));
                                relevantInfo.put("monthAndDay", nextFiveDatesAfterDefaultDeliveryDate.get(i).get(1));
                                relevantInfo.put("year", nextFiveDatesAfterDefaultDeliveryDate.get(i).get(2));
                                output[i] = new HashMap<String, Object>(relevantInfo);
                            }
                        }
                    }
                }
            }

            return new ResponseEntity<>(output, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private List<List<Object>> getNextFiveDatesAfterGivenDate(List<Object> givenDate) {
        /*
            an example for a value of givenDate is ["Monday", "Nov 25", 2025]
        */

        DateTimeFormatter monthDayFormatter = DateTimeFormatter.ofPattern("MMM d", Locale.ENGLISH);
        LocalDate defaultDate = LocalDate.parse(
            givenDate.get(2) + " " + givenDate.get(1),
            DateTimeFormatter.ofPattern("yyyy MMM d", Locale.ENGLISH)
        );


        List<List<Object>> nextFiveDatesAfterDefaultDeliveryDate = new ArrayList<>();

        for (int i = 1; i <= 5; i++) {
            LocalDate nextDate = defaultDate.plusDays(i);

            String dayOfWeek = nextDate.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
            String monthAndDay = nextDate.format(monthDayFormatter);
            int year = nextDate.getYear();

            List<Object> dateComponents = new ArrayList<>();
            dateComponents.add(dayOfWeek);
            dateComponents.add(monthAndDay);
            dateComponents.add(year);

            nextFiveDatesAfterDefaultDeliveryDate.add(dateComponents);
        }

        return nextFiveDatesAfterDefaultDeliveryDate;
    }

    private String getDateStringAfterNumHours(double numHours) {
        LocalDateTime now = LocalDateTime.now();
        
        LocalDateTime futureDateTime = now.plusHours((long) numHours);
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, MMM d yyyy", Locale.ENGLISH);
        return futureDateTime.format(formatter);
    }

    private String convertDifferenceFromDoubleToString(double difference) {
        if(difference<0) {
            return "-"+(-1*difference);
        }
        else {
            return "+"+difference;
        }
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
