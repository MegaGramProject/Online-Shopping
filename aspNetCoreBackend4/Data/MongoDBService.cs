using MongoDB.Driver;
using aspNetCoreBackend4.Models;
using aspNetCoreBackend4.Models.RequestBodies;
using MongoDB.Bson;


namespace aspNetCoreBackend4.Data
{
    public class MongoDBService
    {
        private readonly IMongoCollection<numProductsLeft> _numProductsLeft;

        public MongoDBService(IMongoCollection<numProductsLeft> numProductsLeft)
        {
            _numProductsLeft = numProductsLeft;
        }

        public async Task<List<numProductsLeft>> listAllNumProductsLeft()
        {
            return await _numProductsLeft.Find(_ => true).ToListAsync();
        }

        public async Task<List<numProductsLeft>> listNumProductsLeftForGivenProduct(string productId)
        {
            return await _numProductsLeft.Find(elem => elem.productId==productId).ToListAsync();
        }

        public async Task<ObjectId> addNewEntryToNumProductsLeftCollection (numProductsLeft newEntry)
        {
            await _numProductsLeft.InsertOneAsync(newEntry);
            return newEntry._id;
        }

        public async Task<bool> editNumProductsLeftDocument(EditNumProductsLeft npl)
        {
            var filter = Builders<numProductsLeft>.Filter.Eq(elem => elem.productId, npl.productId);

            var updates = new List<UpdateDefinition<numProductsLeft>>();

            updates.Add(Builders<numProductsLeft>.Update.Set(elem => elem.numForEachOption, npl.numForEachOption));

            var updateDefinition = Builders<numProductsLeft>.Update.Combine(updates);

            var result = await _numProductsLeft.UpdateOneAsync(filter, updateDefinition);

            return result.ModifiedCount > 0;
        }

        public async Task<bool> deleteNumProductsLeftDocument(string productId)
        {
            var filter = Builders<numProductsLeft>.Filter.Eq(elem => elem.productId, productId);

            var result = await _numProductsLeft.DeleteOneAsync(filter);

            return result.DeletedCount > 0;
        }


    }

}
