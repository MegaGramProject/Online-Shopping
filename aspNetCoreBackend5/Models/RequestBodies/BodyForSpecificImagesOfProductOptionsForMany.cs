using System.Text.Json;

namespace aspNetCoreBackend5.Models.RequestBodies;

public class BodyForSpecificImagesOfProductOptionsForMany
{

    public required JsonElement productIdToOptionsListMappingsAsJE {get; set; }

    public required Dictionary<String, String> productIdToImageOptionMappings {get; set;}

}

