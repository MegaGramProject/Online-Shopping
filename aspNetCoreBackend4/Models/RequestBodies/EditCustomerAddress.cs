namespace aspNetCoreBackend4.Models.RequestBodies;

public class EditCustomerAddress
{
    public int id {get; set;}

    public string? username {get; set; }

    public string? house_or_building_number {get; set;}

    public string? street_name {get; set; }

    public string? apartment_or_suite {get; set; }

    public string? town_or_city {get; set; }

    public string? state_or_province {get; set; }

    public string? zipcode {get; set; }

    public string? country {get; set; }

    public bool? is_selected { get; set; }
}

