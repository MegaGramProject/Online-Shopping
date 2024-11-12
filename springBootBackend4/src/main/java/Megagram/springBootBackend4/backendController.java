package Megagram.springBootBackend4;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@RestController
public class backendController {

    public backendController() {
    }
    
    @Autowired
    private ProductSearchTagRepository productSearchTagRepository;

    @Autowired
    private ShopSearchRepository shopSearchRepository;

    @GetMapping("/getAllPSTsAsDict")
    @CrossOrigin({"http://localhost:8024"})
    public ResponseEntity<HashMap<String, String[]>> getAllPSTsAsDict() {
        List<ProductSearchTag> allPSTDocuments = productSearchTagRepository.findAll();
        HashMap<String, String[]> output = new HashMap<String, String[]>();
        for(ProductSearchTag pst: allPSTDocuments) {
            output.put(pst.getProductId(), pst.getTags());
        }
        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    @GetMapping("/getTagsOfProduct/{productId}")
    @CrossOrigin({"http://localhost:8024"})
    public ResponseEntity<String[]> getTagsOfProduct(@PathVariable String productId) {
        ProductSearchTag pst = productSearchTagRepository.findByProductId(productId);
        if (pst == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pst.getTags(), HttpStatus.OK);
    }

    @PostMapping("/addPST/{productId}")
    @CrossOrigin({"http://localhost:8024"})
    public ResponseEntity<ProductSearchTag> addPST(@PathVariable String productId, @RequestBody Map<String, String[]> request) {
        if (request.containsKey("tags")) {
            String[] tags = request.get("tags");
            ProductSearchTag newPst = new ProductSearchTag(productId, tags);
            productSearchTagRepository.save(newPst);
            return new ResponseEntity<>(newPst, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/editPST/{productId}")
    @CrossOrigin({"http://localhost:8024"})
    public ResponseEntity<ProductSearchTag> editPST(@PathVariable String productId, @RequestBody Map<String, String[]> request) {
        if (request.containsKey("tags")) {
            String[] tags = request.get("tags");
            ProductSearchTag pst = productSearchTagRepository.findByProductId(productId);
            if (pst == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            productSearchTagRepository.deleteByProductId(productId);

            ProductSearchTag newPst = new ProductSearchTag(productId, tags);
            productSearchTagRepository.save(newPst);
            return new ResponseEntity<>(newPst, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deletePST/{productId}")
    @CrossOrigin({"http://localhost:8024"})
    public ResponseEntity<String> deletePST(@PathVariable String productId) {
        productSearchTagRepository.deleteByProductId(productId);
        return new ResponseEntity<>("The command to delete has been made!", HttpStatus.OK);
    }

    @PostMapping("/getProductSearchTagMatches")
    @CrossOrigin(origins = "http://localhost:8024")
    public ResponseEntity<List<String>> getProductSearchTagMatches(@RequestBody Map<String, Object> request) {
        if (request.containsKey("pastSearches") &&
            request.containsKey("productIdsForCategoriesInPastSearches")) {
            
            List<List<String>> pastSearches = (List<List<String>>) request.get("pastSearches");
            Map<String, List<String>> productIdsForCategoriesInPastSearches = (Map<String, List<String>>) request.get("productIdsForCategoriesInPastSearches");
            List<String> nameMatchesToExclude = (List<String>) productIdsForCategoriesInPastSearches.get("nameMatches");
    
            HashSet<String> outputAsSet = new HashSet<>();
    
            for (List<String> pastSearch : pastSearches) {
                String pastSearchValue = pastSearch.get(0);
                String pastSearchCategory = pastSearch.get(1).isEmpty() ? "all" : pastSearch.get(1);
    
                List<String> productIds = productIdsForCategoriesInPastSearches.get(pastSearchCategory);
                if(productIds==null) continue;
    
                for (String productId : productIds) {
                    if (!Arrays.asList(nameMatchesToExclude).contains(productId)) {
                        ProductSearchTag pst = productSearchTagRepository.findByProductId(productId);
                        for (String tag : pst.getTags()) {
                            if (tag.startsWith(pastSearchValue)) {
                                outputAsSet.add(productId);
                                break;
                            }
                        }
                    }
                }
            }
    
            List<String> output = new ArrayList<>(outputAsSet);
            return new ResponseEntity<>(output, HttpStatus.OK);
    
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/getAllShopSearches")
    @CrossOrigin({"http://localhost:8024"})
    public ResponseEntity<List<ShopSearch>> getAllShopSearches() {
        List<ShopSearch> allShopSearches = shopSearchRepository.findAll();
        return new ResponseEntity<>(allShopSearches, HttpStatus.OK);
    }

    @GetMapping("/getShopSearchesOfUser/{username}")
    @CrossOrigin({"http://localhost:8024", "http://localhost:8033"})
    public ResponseEntity<List<ShopSearch>> getShopSearchesOfUser(@PathVariable String username) {
        List<ShopSearch> allShopSearchesOfUser = shopSearchRepository.findBySearcherUsernameOrderByDateTimeDesc(username);
        return new ResponseEntity<>(allShopSearchesOfUser, HttpStatus.OK);
    }

    @PostMapping("/addShopSearch/{searcherUsername}")
    @CrossOrigin({"http://localhost:8024"})
    public ResponseEntity<ShopSearch> addShopSearch(@PathVariable String searcherUsername, @RequestBody Map<String, String> request) {
        if(request.containsKey("search") && request.containsKey("searchCategory") && request.containsKey("dateTime")) {
            try {
                List<ShopSearch> allShopSearchesOfUser = shopSearchRepository.findBySearcherUsernameOrderByDateTimeDesc(searcherUsername);
                if(allShopSearchesOfUser.size()==20) {
                    ShopSearch shopSearchToDelete = allShopSearchesOfUser.get(19);
                    shopSearchRepository.delete(shopSearchToDelete);
                }
                
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
                Date parsedDate = formatter.parse(request.get("dateTime"));
                
                ShopSearchId newShopSearchId = new ShopSearchId(request.get("search"), searcherUsername, request.get("searchCategory"));
                ShopSearch newShopSearch = new ShopSearch(newShopSearchId, parsedDate);
                shopSearchRepository.save(newShopSearch);

                return new ResponseEntity<>(newShopSearch, HttpStatus.OK);

            } catch (ParseException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/editShopSearch/{searcherUsername}")
    @CrossOrigin({"http://localhost:8024"})
    public ResponseEntity<ShopSearch> editShopSearch(@PathVariable String searcherUsername, @RequestBody Map<String, String> request) {
        if (request.containsKey("search") && request.containsKey("searchCategory") &&
            request.containsKey("newDateTime") && request.containsKey("newSearch") &&
            request.containsKey("newSearcherUsername") && request.containsKey("newSearchCategory")) {
            try {
                String search = request.get("search");
                String searchCategory = request.get("searchCategory");
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
                Date newDate = formatter.parse(request.get("newDateTime"));
                String newSearch = request.get("newSearch");
                String newSearcherUsername = request.get("newSearcherUsername");
                String newSearchCategory = request.get("newSearchCategory");

                ShopSearch shopSearchToEdit = shopSearchRepository.findById(search, searcherUsername, searchCategory);
                if (shopSearchToEdit == null) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
                
                shopSearchRepository.delete(shopSearchToEdit);

                ShopSearch newShopSearch = new ShopSearch(new ShopSearchId(newSearch, newSearcherUsername, newSearchCategory), newDate);
                shopSearchRepository.save(newShopSearch);
                
                return new ResponseEntity<>(newShopSearch, HttpStatus.OK);

            } catch (ParseException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteShopSearch/{searcherUsername}")
    @CrossOrigin({"http://localhost:8024"})
    public ResponseEntity<Boolean> deleteShopSearch(@PathVariable String searcherUsername, @RequestBody Map<String, String> request) {
        if(!request.containsKey("search") || !request.containsKey("searchCategory")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String search = request.get("search");
        String searchCategory = request.get("searchCategory");
        ShopSearch shopSearchToDelete = shopSearchRepository.findById(search, searcherUsername, searchCategory);
        if (shopSearchToDelete == null) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
        shopSearchRepository.delete(shopSearchToDelete);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("/getShopSearchResults")
    @CrossOrigin({"http://localhost:8024", "http://localhost:8033"})
    public ResponseEntity<List<String>> getShopSearchResults(@RequestBody Map<String, String> request)
    throws Exception {
        if(!request.containsKey("search") || !request.containsKey("searchCategory")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        String searchText = request.get("search");
        String searchCategory = request.get("searchCategory");
        List<String> allTagsStartingWithSearchTextForSearchCategory;
        List<String> popularSearchesInThisCategory;
        if(searchCategory.equals("all")) {
            allTagsStartingWithSearchTextForSearchCategory = getAllTagsStartingWithSearchTextForAllCategories(searchText);
            popularSearchesInThisCategory = shopSearchRepository.orderByPopularityForAllCategories();
        }
        else {
            String urlString = "http://localhost:8022/getIdsOfProductsOfCategory";
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            List<String> productIdsOfCategory;

            try {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("category", searchCategory);
                String jsonBody = jsonObject.toString();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
                connection.setRequestProperty("Accept", "application/json");
                connection.setDoOutput(true); // This is important for POST requests

                try (OutputStream os = connection.getOutputStream()) {
                    byte[] input = jsonBody.getBytes("utf-8");
                    os.write(input, 0, input.length);
                }

                int responseCode = connection.getResponseCode();
                if (responseCode != HttpURLConnection.HTTP_OK) {
                    throw new Exception("Network response not ok, code: " + responseCode);
                }

                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuilder response = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                productIdsOfCategory = parseJsonArray(response.toString());
            }
            catch(Exception e) {
                throw new Exception("Trouble making request");
            }
            
            allTagsStartingWithSearchTextForSearchCategory = getAllTagsStartingWithSearchTextForSearchCategory(searchText, productIdsOfCategory);
            popularSearchesInThisCategory = shopSearchRepository.orderByPopularity(searchCategory);
        }

        List<String> output = new ArrayList<String>();
        Set<String> alreadyInOutput = new HashSet<String>();

        for(int i=0; i<popularSearchesInThisCategory.size(); i++) {
            if(popularSearchesInThisCategory.get(i).startsWith(searchText)) {
                output.add(popularSearchesInThisCategory.get(i));
                alreadyInOutput.add(popularSearchesInThisCategory.get(i));
                if(output.size()==5) {
                    break;
                }
            }
        }

        for(int i=0; i<allTagsStartingWithSearchTextForSearchCategory.size(); i++) {
            if(!(alreadyInOutput.contains(allTagsStartingWithSearchTextForSearchCategory.get(i)))) {
                output.add(allTagsStartingWithSearchTextForSearchCategory.get(i));
                if(output.size()==9) {
                    break;
                }
            }
        }

        return new ResponseEntity<>(output, HttpStatus.OK);
    }

    private static List<String> parseJsonArray(String json) {
        Gson gson = new Gson();
        return gson.fromJson(json, new TypeToken<List<String>>(){}.getType());
    }

    private List<String> getAllTagsStartingWithSearchTextForSearchCategory(String searchText, List<String> productIdsOfCategory) {
        return productSearchTagRepository.filterByProductIdInList(productIdsOfCategory).stream()
                .flatMap(productSearchTag -> Arrays.stream(productSearchTag.getTags()))
                .filter(tag -> tag.startsWith(searchText))
                .collect(Collectors.toList());
    }

    private List<String> getAllTagsStartingWithSearchTextForAllCategories(String searchText) {
        return productSearchTagRepository.findAll().stream()
                .flatMap(productSearchTag -> Arrays.stream(productSearchTag.getTags()))
                .filter(tag -> tag.startsWith(searchText))
                .collect(Collectors.toList());
    }


    @PostMapping("/getSearchTagsOfMultipleProducts")
    @CrossOrigin({"http://localhost:8024"})
    public ResponseEntity<Map<String, String[]>> getSearchTagsOfMultipleProducts(@RequestBody Map<String, String[]> request) {
        if(request.containsKey("productIds")) {
            String[] productIds = request.get("productIds");
            Map<String, String[]> output = new HashMap<String, String[]>();
            for(String productId: productIds) {
                ProductSearchTag pst = productSearchTagRepository.findByProductId(productId);
                output.put(productId, pst.getTags());
            }
            return new ResponseEntity<>(output, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }




    


}
