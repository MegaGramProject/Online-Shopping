using Google.Cloud.Storage.V1;
using System.Text.Json;

namespace aspNetCoreBackend5.Services;

public class GoogleCloudStorageService
{
    private readonly StorageClient _storageClient;

    public GoogleCloudStorageService(string jsonCredentialPath)
    {
        Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", jsonCredentialPath);
        _storageClient = StorageClient.Create();
    }

    public void UploadFile(string bucketName, string localFilePath, string objectName)
    {
        using var fileStream = File.OpenRead(localFilePath);
        _storageClient.UploadObject(bucketName, objectName, null, fileStream);
        Console.WriteLine($"Uploaded {objectName} to bucket {bucketName}.");
    }

    public Stream? GetProductFlyer(string productId)
    {
        string bucketName = "shopping-product-flyers";
        string objectName = $"{productId}.png";
        
        try
        {
            var memoryStream = new MemoryStream();
            _storageClient.DownloadObject(bucketName, objectName, memoryStream);
            memoryStream.Position = 0;
            return memoryStream;
        }
        catch (Google.GoogleApiException e) when (e.HttpStatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    public async Task<bool> AddProductFlyer(string productId, IFormFile file)
    {
        try
        {
            var objectName = $"{productId}.png";
            using (var stream = file.OpenReadStream())
            {
                var uploadObjectOptions = new UploadObjectOptions
                {};

                await _storageClient.UploadObjectAsync(
                    bucket: "shopping-product-flyers",
                    objectName: objectName,
                    contentType: file.ContentType,
                    source: stream,
                    options: uploadObjectOptions
                );
            }
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error uploading file: {ex.Message}");
            return false;
        }
    }


    public async Task<bool> DeleteProductFlyer(string productId)
    {
        string bucketName = "shopping-product-flyers";
        string objectName = $"{productId}.png";

        try
        {
            await _storageClient.DeleteObjectAsync(bucketName, objectName);
            return true;
        }
        catch (Google.GoogleApiException e) when (e.Error.Code == 404)
        {
            return false;
        }
    }

    public Dictionary<int, Dictionary<int, byte[]>> GetProductImages(string productId)
    {
        string bucketName = "shopping-product-images";
        
        try
        {
            var objects = _storageClient.ListObjects(bucketName)
                .Where(o => o.Name.StartsWith(productId))
                .ToList();

            if (!objects.Any())
            {
                return new Dictionary<int, Dictionary<int, byte[]>>();
            }

            Dictionary<int, Dictionary<int, byte[]>> productImages = new Dictionary<int, Dictionary<int, byte[]>>();
            foreach (var obj in objects)
            {
                using (var memoryStream = new MemoryStream())
                {
                    _storageClient.DownloadObject(bucketName, obj.Name, memoryStream);

                    string objNameWithoutJpgExtension = obj.Name.Substring(0, obj.Name.Length - 4);
                    string[] objNameParts = objNameWithoutJpgExtension.Split('-');
                    var optionIndex = int.Parse(objNameParts[1]);
                    var position = int.Parse(objNameParts[2]);

                    if (!productImages.ContainsKey(optionIndex)) {
                        productImages[optionIndex] = new Dictionary<int, byte[]>();
                    }
                    productImages[optionIndex][position] = memoryStream.ToArray();
                }
            }
            return productImages;
        }
        catch (Google.GoogleApiException e) when (e.HttpStatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return new Dictionary<int, Dictionary<int, byte[]>>();
        }
    }

    public async Task<bool> AddProductImage(string objectName, IFormFile file)
    {
        try
        {
            using (var stream = file.OpenReadStream())
            {
                var uploadObjectOptions = new UploadObjectOptions
                {};

                await _storageClient.UploadObjectAsync(
                    bucket: "shopping-product-images",
                    objectName: objectName,
                    contentType: file.ContentType,
                    source: stream,
                    options: uploadObjectOptions
                );
            }
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error uploading file: {ex.Message}");
            return false;
        }
    }

    public async Task<string> DeleteProductImages(string productId)
    {
        string bucketName = "shopping-product-images";
        
        try
        {
            var objects = _storageClient.ListObjects(bucketName)
                .Where(o => o.Name.StartsWith(productId))
                .ToList();

            if (!objects.Any())
            {
                return "None Found";
            }

            var numDeleteFailures = 0;
            foreach (var obj in objects)
            {
                try
                {
                    await _storageClient.DeleteObjectAsync(bucketName, obj.Name);
                }
                catch (Google.GoogleApiException e) when (e.Error.Code == 404)
                {
                    numDeleteFailures++;
                }
            }
            if(numDeleteFailures==0) {
                return "Success";
            }
            return "There were images that weren't able to get deleted";
        }
        catch (Google.GoogleApiException e) when (e.HttpStatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return "There were images that weren't able to get deleted";
        }
    }

    public Dictionary<string, byte[]> getMainProductImagesOfProducts(string[] productIds)
    {
        string bucketName = "shopping-product-images";
        
        try
        {
            var objects = _storageClient.ListObjects(bucketName)
                .Where(o => o.Name.Substring(24)=="-0-0.jpg" && productIds.Contains(o.Name.Substring(0, 24)))
                .ToList();

            if (!objects.Any())
            {
                return new Dictionary<string, byte[]>();
            }

            Dictionary<string, byte[]> mainProductImagesOfProducts = new Dictionary<string, byte[]>();
            foreach (var obj in objects)
            {
                using (var memoryStream = new MemoryStream())
                {
                    _storageClient.DownloadObject(bucketName, obj.Name, memoryStream);

                    mainProductImagesOfProducts[obj.Name.Substring(0, 24)] = memoryStream.ToArray();
                }
            }
            return mainProductImagesOfProducts;
        }
        catch (Google.GoogleApiException e) when (e.HttpStatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return new Dictionary<string, byte[]>();
        }
    }

    public Dictionary<string, List<List<object>>> getSpecificImagesOfProductOptionsForMany(JsonElement productIdToOptionsListMappingsAsJE, Dictionary<string, string> productIdToImageOptionMappings)
    {
        string bucketName = "shopping-product-images";
        HashSet<string> setOfProductIds = new HashSet<string>();
        Dictionary<string, List<Dictionary<string, int>>> productIdToOptionsListMappings = new Dictionary<string, List<Dictionary<string, int>>>();

        foreach (JsonProperty property in productIdToOptionsListMappingsAsJE.EnumerateObject())
        {
            string productId = property.Name;
            List<Dictionary<string, int>> options = JsonSerializer.Deserialize<List<Dictionary<string, int>>>(property.Value.ToString())!;

            setOfProductIds.Add(productId);
            productIdToOptionsListMappings[productId] = options;
        }

        try
        {
            var objects = _storageClient.ListObjects(bucketName)
                .Where(o => setOfProductIds.Contains(o.Name.Substring(0, 24)) && o.Name.EndsWith("-0.jpg"))
                .ToList();

            Dictionary<string, List<List<object>>> output = new Dictionary<string, List<List<object>>>();
            foreach (var obj in objects)
            {
                string productId = obj.Name.Substring(0, 24);

                int optionValueOfObject = 0;
                int firstHyphenIndex = obj.Name.IndexOf('-');
                int secondHyphenIndex = obj.Name.IndexOf('-', firstHyphenIndex + 1);

                string valueBetweenHyphens = obj.Name.Substring(firstHyphenIndex + 1, secondHyphenIndex - firstHyphenIndex - 1);

                if (!int.TryParse(valueBetweenHyphens, out optionValueOfObject))
                {
                    continue;
                }

                string nameOfOptionWithImages = productIdToImageOptionMappings[productId];
                List<Dictionary<string, int>> listOfGivenOptionsForProduct = productIdToOptionsListMappings[productId];

                foreach (Dictionary<string, int> givenProductOptions in listOfGivenOptionsForProduct)
                {
                    if (nameOfOptionWithImages != null)
                    {
                        int optionValue = givenProductOptions[nameOfOptionWithImages];
                        if (optionValue != optionValueOfObject)
                        {
                            continue;
                        }
                    }

                    using (var memoryStream = new MemoryStream())
                    {
                        _storageClient.DownloadObject(bucketName, obj.Name, memoryStream);

                        if (output.ContainsKey(productId)==false)
                        {
                            output[productId] = new List<List<object>>();
                        }
                        output[productId].Add(new List<object> { givenProductOptions, memoryStream.ToArray() });
                    }
                }
            }
            return output;
        }
        catch (Google.GoogleApiException e) when (e.HttpStatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return new Dictionary<string, List<List<object>>>();
        }
    }

    
}
