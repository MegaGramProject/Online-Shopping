using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace aspNetCoreBackend4.Models
{
    public class numProductsLeft
    {
        [BsonId]
        public ObjectId _id { get; set; }

        [BsonElement("productId")]
        public string productId { get; set; }

        [BsonElement("numForEachOption")]
        public string numForEachOption { get; set; }
    }
}
