using MongoDB.Bson;


namespace aspNetCoreBackend4.Models.RequestBodies;

public class EditNumProductsLeft
{
    public string productId { get; set; }

    public string numForEachOption { get; set; }
}

