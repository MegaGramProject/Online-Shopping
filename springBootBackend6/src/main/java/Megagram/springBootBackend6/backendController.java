package Megagram.springBootBackend6;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
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


@RestController
public class backendController {

    public backendController() {
    }

    @Autowired
    private ItemSavedForLaterRepository itemSavedForLaterRepository;

    @GetMapping("/getAllItemsSavedForLater")
    @CrossOrigin({"http://localhost:8033"})
    public ResponseEntity<List<ItemSavedForLater>> getAllItemsSavedForLater() {
        List<ItemSavedForLater> allItemsSavedForLater = itemSavedForLaterRepository.findAll();
        return new ResponseEntity<>(allItemsSavedForLater, HttpStatus.OK);
    }

    @GetMapping("/getAllItemsSavedForLaterOfUser/{username}")
    @CrossOrigin({"http://localhost:8033"})
    public ResponseEntity<List<ItemSavedForLater>> getAllItemsSavedForLaterOfUser(@PathVariable String username) {
        List<ItemSavedForLater> allItemsSavedForLaterOfUser = itemSavedForLaterRepository.findByUsername(username);
        return new ResponseEntity<>(allItemsSavedForLaterOfUser, HttpStatus.OK);
    }

    @PostMapping("/addItemSavedForLater")
    @CrossOrigin({"http://localhost:8033"})
    public ResponseEntity<ItemSavedForLater> addItemSavedForLater(@RequestBody Map<String, Object> request) {
        if (request.containsKey("username") && request.containsKey("productId")
        && request.containsKey("options")) {
            String username = (String) request.get("username");
            String productId = (String) request.get("productId");
            HashMap<String, Integer> options = (HashMap<String, Integer>) request.get("options");
            ItemSavedForLater newItemSavedForLater = new ItemSavedForLater(username, productId, options);
            itemSavedForLaterRepository.save(newItemSavedForLater);
            return new ResponseEntity<>(newItemSavedForLater, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/editItemSavedForLater/{id}")
    @CrossOrigin({"http://localhost:8033"})
    public ResponseEntity<ItemSavedForLater> editItemSavedForLater(@PathVariable String id, @RequestBody Map<String, Object> request) {
        if (request.containsKey("username") || request.containsKey("productId")
        || request.containsKey("options")) {
            Optional<ItemSavedForLater> itemSavedForLaterOptional = itemSavedForLaterRepository.findById(new ObjectId(id));
            if (!itemSavedForLaterOptional.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            ItemSavedForLater itemSavedForLaterToEdit = itemSavedForLaterOptional.get();

            if(request.containsKey("username")) {
                itemSavedForLaterToEdit.setUsername((String)request.get("username"));
            }
            if(request.containsKey("productId")) {
                itemSavedForLaterToEdit.setProductId((String)request.get("productId"));
            }
            if(request.containsKey("options")) {
                itemSavedForLaterToEdit.setOptions((HashMap<String, Integer>)request.get("options"));
            }
            itemSavedForLaterRepository.save(itemSavedForLaterToEdit);
            return new ResponseEntity<>(itemSavedForLaterToEdit, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteItemSavedForLater/{id}")
    @CrossOrigin({"http://localhost:8033"})
    public ResponseEntity<Void> deleteItemSavedForLater(@PathVariable String id) {
        itemSavedForLaterRepository.deleteById(new ObjectId(id));
        return ResponseEntity.noContent().build();   //204 No Content response
    }
    
}
