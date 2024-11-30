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

import Megagram.springBootBackend6.mongodbModels.ItemSavedForLater;
import Megagram.springBootBackend6.mongodbRepositories.ItemSavedForLaterRepository;
import Megagram.springBootBackend6.mysqlModels.AddressDeliveryInstructions;
import Megagram.springBootBackend6.mysqlRepositories.AddressDeliveryInstructionsRepository;


@RestController
public class backendController {

    public backendController() {
    }

    @Autowired
    private ItemSavedForLaterRepository itemSavedForLaterRepository;

    @Autowired
    private AddressDeliveryInstructionsRepository addressDeliveryInstructionsRepository;

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

    @GetMapping("/getAllAddressDeliveryInstructions")
    @CrossOrigin({"http://localhost:8033"})
    public ResponseEntity<List<AddressDeliveryInstructions>> getAllAddressDeliveryInstructions() {
        List<AddressDeliveryInstructions> allAddressDeliveryInstructions = addressDeliveryInstructionsRepository.findAll();
        return new ResponseEntity<>(allAddressDeliveryInstructions, HttpStatus.OK);
    }

    @GetMapping("/getAllAddressDeliveryInstructionsOfUser/{username}")
    @CrossOrigin({"http://localhost:8033"})
    public ResponseEntity<HashMap<Integer, AddressDeliveryInstructions>> getAllAddressDeliveryInstructionsOfUser(@PathVariable String username) {
        List<AddressDeliveryInstructions> allAddressDeliveryInstructionsOfUser = addressDeliveryInstructionsRepository.findByUsername(username);
        HashMap<Integer, AddressDeliveryInstructions> addressIdToDeliveryInstructionsMappings = new HashMap<Integer, AddressDeliveryInstructions>();
        for(AddressDeliveryInstructions adi : allAddressDeliveryInstructionsOfUser) {
            addressIdToDeliveryInstructionsMappings.put(adi.getAddressId(), adi);
        }
        return new ResponseEntity<>(addressIdToDeliveryInstructionsMappings, HttpStatus.OK);
    }

    @PostMapping("/addAddressDeliveryInstructions")
    @CrossOrigin({"http://localhost:8033"})
    public ResponseEntity<AddressDeliveryInstructions> addAddressDeliveryInstructions(@RequestBody Map<String, Object> request) {
        int addressId = (int) request.get("addressId");
        String username = (String) request.get("username");
        
        AddressDeliveryInstructions newAdi = new AddressDeliveryInstructions(addressId, username, "Home", "Front door");
        addressDeliveryInstructionsRepository.save(newAdi);
        return new ResponseEntity<>(newAdi, HttpStatus.OK);
    }

    @PatchMapping("/editAddressDeliveryInstructions/{id}")
    @CrossOrigin({"http://localhost:8033"})
    public ResponseEntity<AddressDeliveryInstructions> editAddressDeliveryInstructions(@PathVariable int id, @RequestBody Map<String, Object> request) {
        Optional<AddressDeliveryInstructions> adiOptional = addressDeliveryInstructionsRepository.findByAddressId(id);
        if (!adiOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        AddressDeliveryInstructions adiToEdit = adiOptional.get();

        if(request.containsKey("propertyType")) {
            adiToEdit.setPropertyType((String) request.get("propertyType"));
        }
        if(request.containsKey("whereToLeavePackage")) {
            adiToEdit.setWhereToLeavePackage((String) request.get("whereToLeavePackage"));
        }
        if(request.containsKey("securityCode")) {
            adiToEdit.setSecurityCode((String) request.get("securityCode"));
        }
        if(request.containsKey("callBox")) {
            adiToEdit.setCallBox((String) request.get("callBox"));
        }
        if(request.containsKey("keyOrFobIsRequired")) {
            adiToEdit.setKeyOrFobIsRequired((boolean) request.get("keyOrFobIsRequired"));
        }
        if(request.containsKey("dogPresent")) {
            adiToEdit.setDogPresent((boolean) request.get("dogPresent"));
        }
        if(request.containsKey("additionalInstructions")) {
            adiToEdit.setAdditionalInstructions((String) request.get("additionalInstructions"));
        }
        if(request.containsKey("hoursOpenForDelivery")) {
            adiToEdit.setHoursOpenForDelivery((String) request.get("hoursOpenForDelivery"));
        }
        if(request.containsKey("availableOnFederalHolidays")) {
            adiToEdit.setAvailableOnFederalHolidays((boolean) request.get("availableOnFederalHolidays"));
        }


        addressDeliveryInstructionsRepository.save(adiToEdit);
        return new ResponseEntity<>(adiToEdit, HttpStatus.OK);
    }

    @DeleteMapping("/deleteAddressDeliveryInstructions/{id}")
    @CrossOrigin({"http://localhost:8033"})
    public ResponseEntity<Void> deleteAddressDeliveryInstructions(@PathVariable int id) {
        addressDeliveryInstructionsRepository.deleteById(id);
        return ResponseEntity.noContent().build();   //204 No Content response
    }
    
}
