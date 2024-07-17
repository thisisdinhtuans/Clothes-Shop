using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware
{
    //đại diện cho middleware tiếp theo trong pineline
    private readonly RequestDelegate _next;
    //dùng để ghi log
    private readonly ILogger<ExceptionMiddleware> _logger;
    //cung cấp thông tin mỗi trường hiện tại(development, staging, production)
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {

        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            //gọi middleware tiếp theo trong pineline
            await _next(context);
        }
        catch (Exception ex)
        {
            //ghi lỗi
            _logger.LogError(ex, ex.Message);
            //thiết lập nội dung phản hồi
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = 500;

            //ProblemDetails chứa thông tin về lỗi
            var response = new ProblemDetails
            {
                Status = 500,
                //_env.IsDevelopment đại diện cho IHostEnviroment, chứa thông tin StackTrace của ngoại lệ dạng chuỗi, nơi xảy ra ngoại lệ
                Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
                Title = ex.Message
            };

            //Tùy chọn JSON để sử dụng quy tắc đặt tên camelCase
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            //Chuyển đổi đối tượng ProblemDetails thành JSON
            var json = JsonSerializer.Serialize(response, options);

            //Ghi JSON vào phản hồi HTTP
            await context.Response.WriteAsync(json);
        }
    }
}