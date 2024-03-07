using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//nơi để ghi những cái dependency injection, jwt ...

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StoreContext>(opt=>{
    //GetConnectionString lấy từ Configuration nha
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
//Dòng này được sử dụng để thêm dịch vụ CORS vào hệ thống dịch vụ của ứng dụng.
builder.Services.AddCors();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Đây là cấu hình cụ thể của CORS. Bạn đang chỉ định rằng bất kỳ trang web nào có nguồn gốc từ http://localhost:3000 (domain này) được phép gửi yêu cầu tới API của bạn. 
//AllowAnyHeader() cho phép bất kỳ header nào trong yêu cầu, 
//AllowAnyMethod() cho phép bất kỳ phương thức nào (GET, POST, PUT, DELETE, vv.), và .WithOrigins("http://localhost:3000") chỉ định nguồn gốc cụ thể được phép gửi yêu cầu.
app.UseCors(opt=>{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context);   
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occurred during migration");
}

app.Run();
