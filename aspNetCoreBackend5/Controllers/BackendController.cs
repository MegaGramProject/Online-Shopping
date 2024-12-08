using Microsoft.AspNetCore.Mvc;
using aspNetCoreBackend5.Services;
using aspNetCoreBackend5.Models.RequestBodies;

namespace aspNetCoreBackend5.Controllers;

[ApiController]
[Route("/")]
public class BackendController : ControllerBase
{

    private readonly GoogleCloudStorageService _gcsService;

    public BackendController(GoogleCloudStorageService gcsService)
    {
        _gcsService = gcsService;
    }

    [HttpGet("getProductFlyer/{productId}")]
    public object getProductFlyer(string productId)
    {
        var productFlyerStream = _gcsService.GetProductFlyer(productId);
        if(productFlyerStream==null) {
            return NotFound(null);
        }
        return File(productFlyerStream, "image/png");
    }

    [HttpPost("addProductFlyer/{productId}")]
    public async Task<IActionResult> AddProductFlyer(string productId, [FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file provided or file is empty.");
        }

        var successfullyAdded =  await _gcsService.AddProductFlyer(productId, file);
        if (successfullyAdded)
        {
            return Ok(true);
        }

        return StatusCode(StatusCodes.Status500InternalServerError, false);
    }

    [HttpDelete("deleteProductFlyer/{productId}")]
    public async Task<IActionResult> DeleteProductFlyer(string productId)
    {

        var wasFoundAndDeleted =  await _gcsService.DeleteProductFlyer(productId);
        if (!wasFoundAndDeleted)
        {
            return NotFound(false);
        }

        return Ok(true);
    }

    [HttpGet("getProductImages/{productId}")]
    public IActionResult getProductImages(string productId)
    {
        var productImages = _gcsService.GetProductImages(productId);
        
        return Ok(productImages);
    }

    [HttpPost("addProductImages/{productId}")]
    public async Task<IActionResult> addProductImages(string productId, [FromForm] IFormCollection formData)
    {
        var numImgsFailed = 0;

        foreach (var key in formData.Keys)
        {
            var wasProductImageAdded = await _gcsService.AddProductImage($"{productId}-${key}.jpg", formData.Files[key]!);
            if(!wasProductImageAdded) {
                numImgsFailed++;
            }
        }
        if(numImgsFailed==0) {
            return Ok("Success");
        }

        return StatusCode(StatusCodes.Status500InternalServerError, "There were images that weren't able to get added");
    }

    [HttpDelete("deleteProductImages/{productId}")]
    public async Task<IActionResult> deleteProductImages(string productId)
    {

        var output =  await _gcsService.DeleteProductImages(productId);
        if (output=="There were images that weren't able to get deleted")
        {
            return StatusCode(StatusCodes.Status500InternalServerError, false);
        }
        else if(output=="None Found") {
            return NotFound(false);
        }

        return Ok(true);
    }

    [HttpPost("getMainProductImagesOfProducts")]
    public IActionResult getMainProductImagesOfProducts([FromBody] string[] productIds)
    {
        
        var mainProductImagesOfProducts = _gcsService.getMainProductImagesOfProducts(productIds);
        return Ok(mainProductImagesOfProducts);
    }


    [HttpPost("getSpecificImagesOfProductOptionsForMany")]
    public IActionResult getSpecificImagesOfProductOptionsForMany([FromBody] BodyForSpecificImagesOfProductOptionsForMany requestBody) {
        var specificImagesOfProductOptionsForMany = _gcsService.getSpecificImagesOfProductOptionsForMany(requestBody.productIdToOptionsListMappingsAsJE, requestBody.productIdToImageOptionMappings);
        return Ok(specificImagesOfProductOptionsForMany);
    }


}