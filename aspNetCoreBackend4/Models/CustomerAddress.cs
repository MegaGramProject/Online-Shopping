using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace aspNetCoreBackend4.Models;

[Table("customer_addresses")]
public class CustomerAddress
{
    [Key]
    public int id {get; set;}

    [Column("username")]
    public string username {get; set; }

    [Column("house_or_building_number")]
    public string? house_or_building_number {get; set;}

    [Column("street_name")]
    public string street_name {get; set; }

    [Column("apartment_or_suite")]
    public string? apartment_or_suite {get; set; }

    [Column("town_or_city")]
    public string town_or_city {get; set; }

    [Column("state_or_province")]
    public string? state_or_province {get; set; }

    [Column("zipcode")]
    public string zipcode {get; set; }

    [Column("country")]
    public string country {get; set; }

    [Column("is_selected")]
    public bool is_selected { get; set; }
}

