using System.Text;
using API.Data;
using API.Entities;
using API.Middleware;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//nơi để ghi những cái dependency injection, jwt ...

builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c=>
{
    var jwtSecurityScheme=new OpenApiSecurityScheme
    {
        BearerFormat="JWT",
        Name="Authorization",
        In=ParameterLocation.Header,
        Type=SecuritySchemeType.ApiKey,
        Scheme=JwtBearerDefaults.AuthenticationScheme,
        Description="Put Bearer + your token in the Stack below",
        Reference = new OpenApiReference
        {
            Id=JwtBearerDefaults.AuthenticationScheme,
            Type=ReferenceType.SecurityScheme,
        }
    };

    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            jwtSecurityScheme, Array.Empty<string>()
        }
    });
});

// string connString;
// if (builder.Environment.IsDevelopment())
//     connString = builder.Configuration.GetConnectionString("DefaultConnection");
// else
// {
//     // Use connection string provided at runtime by FlyIO.
//     var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

//     // Parse connection URL to connection string for Npgsql
//     connUrl = connUrl.Replace("postgres://", string.Empty);
//     var pgUserPass = connUrl.Split("@")[0];
//     var pgHostPortDb = connUrl.Split("@")[1];
//     var pgHostPort = pgHostPortDb.Split("/")[0];
//     var pgDb = pgHostPortDb.Split("/")[1];
//     var pgUser = pgUserPass.Split(":")[0];
//     var pgPass = pgUserPass.Split(":")[1];
//     var pgHost = pgHostPort.Split(":")[0];
//     var pgPort = pgHostPort.Split(":")[1];
//     var updatedHost = pgHost.Replace("flycast", "internal");

//     connString = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
// }

builder.Services.AddDbContext<StoreContext>(opt=>{
    //GetConnectionString lấy từ Configuration nha
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
//Dòng này được sử dụng để thêm dịch vụ CORS vào hệ thống dịch vụ của ứng dụng.
builder.Services.AddCors();

builder.Services.AddIdentityCore<User>(opt=>{
        opt.User.RequireUniqueEmail=true;
    })
    .AddRoles<Role>()
    .AddEntityFrameworkStores<StoreContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt=>
    {
        opt.TokenValidationParameters=new TokenValidationParameters 
        {
            ValidateIssuer=false,
            ValidateAudience=false,
            ValidateLifetime=true,
            ValidateIssuerSigningKey=true,
            IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
        };
    }
);
builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<PaymentService>();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c=>
    {
        c.ConfigObject.AdditionalItems.Add("persistAuthorization","true");
    });
}


app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToController("Index","Fallback");

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
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
// app.MapFallbackToController("Index", "Fallback");

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
