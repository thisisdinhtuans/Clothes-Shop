using System.Text.Json;
using API.RequestHelpers;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
        {
            var options=new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
            //Nó sẽ trả về như sau:
            // pagination: {"CurrentPage":1,"TotalPages":1,"PageSize":6,"TotalCount":2}
            response.Headers.Append("Pagination", JsonSerializer.Serialize(metaData,options));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");

        }
    }
}