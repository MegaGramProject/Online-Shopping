package Megagram.springBootBackend6.mongodbRepositories;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import Megagram.springBootBackend6.mongodbModels.ItemSavedForLater;

public interface ItemSavedForLaterRepository extends MongoRepository<ItemSavedForLater, ObjectId> {

    List<ItemSavedForLater> findByUsername(String username);

}
