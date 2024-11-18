package Megagram.springBootBackend6;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemSavedForLaterRepository extends MongoRepository<ItemSavedForLater, ObjectId> {

    List<ItemSavedForLater> findByUsername(String username);

}
