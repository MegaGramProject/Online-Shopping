using Microsoft.AspNetCore.Mvc;
using aspNetCoreBackend4.Data;
using Microsoft.EntityFrameworkCore;
using aspNetCoreBackend4.Models;
using aspNetCoreBackend4.Models.RequestBodies;

namespace Megagram.Controllers;

[ApiController]
[Route("/")]
public class BackendController : ControllerBase
{

    private readonly MegaDBContext _megaDBContext;
    private readonly MongoDBService _mongoDBService;

    public BackendController(MegaDBContext megaDBContext, MongoDBService mongoDBService)
    {
        _megaDBContext = megaDBContext;
        _mongoDBService = mongoDBService;
    }

    [HttpGet("getAllCustomerAddresses")]
    public async Task<IActionResult> getAllCustomerAddresses()
    {
        var allCustomerAddresses = await _megaDBContext.customerAddresses.ToListAsync();
        return Ok(allCustomerAddresses);
    }

    [HttpGet("getAddressesOfUser/{username}")]
    public async Task<IActionResult> getAddressesOfUser(string username)
    {
        var addressesOfUser = await _megaDBContext
            .customerAddresses
            .Where(x => x.username == username)
            .OrderByDescending(x => x.is_selected) // The selected address will come first
            .ToListAsync();

        return Ok(addressesOfUser);
    }

    [HttpGet("getSelectedAddressOfUser/{username}")]
    public async Task<IActionResult> getSelectedAddressOfUser(string username)
    {
        var selectedAddress = await _megaDBContext
            .customerAddresses
            .Where(x => x.username == username && x.is_selected)
            .FirstOrDefaultAsync();

        if(selectedAddress==null) {
            return NotFound(null);
        }

        return Ok(selectedAddress);
    }
    

    [HttpPost("addNewCustomerAddress")]
    public async Task<IActionResult> addNewCustomerAddress([FromBody] CustomerAddress newCustomerAddress) {
        if (newCustomerAddress == null) {
            return BadRequest("Invalid address data.");
        }

        _megaDBContext.customerAddresses.Add(newCustomerAddress);
        await _megaDBContext.SaveChangesAsync();

        return Ok(newCustomerAddress.id);
    }

    [HttpPatch("toggleSelectCustomerAddress/{id}")]
    public async Task<IActionResult> toggleSelectCustomerAddress(int id) {
        var customerAddressToToggleSelect = await _megaDBContext.customerAddresses
        .FirstOrDefaultAsync(cl => cl.id == id);

        if(customerAddressToToggleSelect==null) {
            return NotFound(false);
        }
        customerAddressToToggleSelect.is_selected = !customerAddressToToggleSelect.is_selected;
        _megaDBContext.customerAddresses.Update(customerAddressToToggleSelect);
        await _megaDBContext.SaveChangesAsync();
        return Ok(true);
    }

    [HttpPatch("editCustomerAddress")]
    public async Task<IActionResult> editCustomerAddress([FromBody] EditCustomerAddress ca) {
        if (ca == null) {
            return BadRequest(false);
        }

        var customerAddressToEdit = await _megaDBContext.customerAddresses
        .FirstOrDefaultAsync(cl => cl.id == ca.id);

        if(customerAddressToEdit!=null) {
            if(ca.username!=null) {
                customerAddressToEdit.username = ca.username;
            }

            customerAddressToEdit.house_or_building_number = ca.house_or_building_number;

            if(ca.street_name!=null) {
                customerAddressToEdit.street_name = ca.street_name;
            }

            customerAddressToEdit.apartment_or_suite = ca.apartment_or_suite;

            if(ca.town_or_city!=null) {
                customerAddressToEdit.town_or_city = ca.town_or_city;
            }

            customerAddressToEdit.state_or_province = ca.state_or_province;
            
            if(ca.zipcode!=null) {
                customerAddressToEdit.zipcode = ca.zipcode;
            }
            if(ca.country!=null) {
                customerAddressToEdit.country = ca.country;
            }
            if(ca.is_selected!=null) {
                customerAddressToEdit.is_selected = (bool) ca.is_selected;
            }
            if(ca.full_name!=null) {
                customerAddressToEdit.full_name = ca.full_name;
            }
            if(ca.phone_number!=null) {
                customerAddressToEdit.phone_number = ca.phone_number;
            }
            _megaDBContext.customerAddresses.Update(customerAddressToEdit);
            await _megaDBContext.SaveChangesAsync();
            return Ok(true);
        }
        return NotFound(false);
    }

    [HttpPatch("unselectSelectedAddressOfUser/{username}")]
    public async Task<IActionResult> unselectSelectedAddressOfUser(string username) {
        var customerAddressToUnselect = await _megaDBContext.customerAddresses
        .FirstOrDefaultAsync(cl => cl.username == username && cl.is_selected);

        if(customerAddressToUnselect==null) {
            return NotFound(false);
        }
        customerAddressToUnselect.is_selected = false;
        _megaDBContext.customerAddresses.Update(customerAddressToUnselect);
        await _megaDBContext.SaveChangesAsync();
        return Ok(true);
    }

    [HttpDelete("deleteCustomerAddress/{id}")]
    public async Task<IActionResult> deleteCustomerAddress(int id) {
        var customerAddressToDelete = await _megaDBContext.customerAddresses
        .FirstOrDefaultAsync(cl => cl.id == id);

        if (customerAddressToDelete != null)
        {
            _megaDBContext.customerAddresses.Remove(customerAddressToDelete);
            await _megaDBContext.SaveChangesAsync();

            return Ok(true);
        }

        return NotFound(false);
    }
    
    [HttpGet("getAllNumProductsLeft")]
    public async Task<IActionResult> getAllNumProductsLeft()
    {
        var allNumProductsLeft = await _mongoDBService.listAllNumProductsLeft();
        return Ok(allNumProductsLeft);
    }

    [HttpGet("getNumProductsLeftOfProduct/{productId}")]
    public async Task<IActionResult> getNumProductsLeftOfProduct(string productId)
    {
        var numProductsLeftOfProduct = await _mongoDBService.listNumProductsLeftForGivenProduct(productId);
        return Ok(numProductsLeftOfProduct);
    }

    [HttpPost("addNumProductsLeft")]
    public async Task<IActionResult> addNumProductsLeft([FromBody] numProductsLeft newDocument)
    {
        if (newDocument == null) {
            return BadRequest(newDocument);
        }
        var newDocumentId = await _mongoDBService.addNewEntryToNumProductsLeftCollection(newDocument);
        return Ok(newDocumentId);
    }

    [HttpPost("getNumProductsLeftForListOfProducts")]
    public async Task<IActionResult> getNumProductsLeftForListOfProducts([FromBody] string[] productIds)
    {
        if (productIds.Count() == 0) {
            return BadRequest(productIds);
        }
        var numProductsLeftForGivenProductIds =  await _mongoDBService.getNumProductsLeftForListOfProducts(productIds);
        return Ok(numProductsLeftForGivenProductIds);
    }

    [HttpPatch("editNumProductsLeft")]
    public async Task<IActionResult> editNumProductsLeft([FromBody] EditNumProductsLeft npl)
    {
        if (npl == null) {
            return BadRequest(false);
        }
        var hasChangeBeenMade = await _mongoDBService.editNumProductsLeftDocument(npl);
        if(hasChangeBeenMade) {
            return Ok(true);
        }
        return NotFound(false);
    }

    [HttpDelete("deleteNumProductsLeft/{productId}")]
    public async Task<IActionResult> deleteNumProductsLeft(string productId) {
        if (productId == null) {
            return BadRequest(false);
        }
        var hasChangeBeenMade = await _mongoDBService.deleteNumProductsLeftDocument(productId);
        if(hasChangeBeenMade) {
            return Ok(true);
        }
        return NotFound(false);
    }




}