using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Identity;
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

builder.Services.AddIdentityCore<User>(opt=>{
    opt.User.RequireUniqueEmail=true;
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<StoreContext>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();
var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Đây là cấu hình cụ thể của CORS. Bạn đang chỉ định rằng bất kỳ trang web nào có nguồn gốc từ http://localhost:3000 (domain này) được phép gửi yêu cầu tới API của bạn. 
//AllowAnyHeader() cho phép bất kỳ header nào trong yêu cầu, 
//AllowAnyMethod() cho phép bất kỳ phương thức nào (GET, POST, PUT, DELETE, vv.), và .WithOrigins("http://localhost:3000") chỉ định nguồn gốc cụ thể được phép gửi yêu cầu.
//tại sao ở đây lại sử dụng 'AllowCredentials'? vì nó chỉ ra trình duyệt có thể gửi và nhận các cookie, mã thông báo xác thực hoặc các thông tin xác thực khác khi yêu cầu được gửi đến tài nguyên từ nguồn khác
//khi thiết lập AllowCredentials, đối tượng gửi yêu cầu từ nguồn khác có thẻ sử dụng các thông tin xác thực như cookie hay header xác thực trong yêu cầu của họ. Điều này là cần thiết trong 1 số trường hợp, đặc biệt khi bạn xác thực người dùng trên các trang web hoặc ứng dụng khác nguồn.
//việc sử dụng AllowCredentials sẽ làm tăng nguy cơ bảo maajttrong 1 số trương hợp, do đó bạn cần đảm bảo cần thiết và an toàn trong ứng dụng của bạn
app.UseCors(opt=>{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var userManager=scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    context.Database.Migrate();
    await DbInitializer.Initialize(context, userManager);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occurred during migration");
}

app.Run();
