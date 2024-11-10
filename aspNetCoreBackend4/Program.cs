using aspNetCoreBackend4.Data;
using Microsoft.EntityFrameworkCore;
using aspNetCoreBackend4.Models;
using MongoDB.Driver;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
        options.AddPolicy("AllowSpecificOrigin", policy =>
        {
                policy.WithOrigins("http://localhost:8024", "http://localhost:8033")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


builder.Services.AddControllers();

builder.Services.AddDbContext<MegaDBContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("PSQLConnection")));
builder.Services.AddScoped<MegaDBContext>();

var mongoDbConnectionString = builder.Configuration.GetConnectionString("MongoDBConnection");
var mongoClient = new MongoClient(mongoDbConnectionString);
var mongoDatabase = mongoClient.GetDatabase("Megagram");
var numProductsLeft = mongoDatabase.GetCollection<numProductsLeft>("numProductsLeft");
builder.Services.AddSingleton<IMongoCollection<numProductsLeft>>(numProductsLeft);
builder.Services.AddSingleton<MongoDBService>();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");


app.MapControllers();


app.Run();

