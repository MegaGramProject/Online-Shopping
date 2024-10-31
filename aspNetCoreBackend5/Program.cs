using aspNetCoreBackend5.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
        {
        options.AddPolicy("AllowSpecificOrigin",
                builder =>
                {
                        builder.WithOrigins("http://localhost:8024")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                });
        });


builder.Services.AddControllers();
builder.Services.AddSingleton(new GoogleCloudStorageService("/Users/rishavr/Downloads/megagram-428802-476264306d3b.json"));

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");
app.MapControllers();


app.Run();
