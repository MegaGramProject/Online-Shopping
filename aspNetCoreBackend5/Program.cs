using aspNetCoreBackend5.Services;

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
builder.Services.AddSingleton(new GoogleCloudStorageService("/Users/rishavr/Downloads/megagram-428802-9481f000861d.json"));

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");
app.MapControllers();


app.Run();
