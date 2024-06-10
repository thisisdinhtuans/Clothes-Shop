using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public static class DbInitializer
{
    public static async Task Initialize(StoreContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user = new User
            {
                UserName = "bob",
                Email = "bob@test.com"
            };

            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");

            var admin = new User
            {
                UserName = "admin",
                Email = "admin@test.com"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Member" });
        }
        if (context.Products.Any()) return;

        var products = new List<Product>
            {
                new Product
{
    Id = 1,
    Name = "DC x LA LUNE Phoenix Reversible Puffer Jacket",
    Description = "Sự kết hợp đặc biệt đến từ DirtyCoins và La Lune, chiếc áo mang trong mình hình ảnh của loài chim phượng hoàng đại diện cho sự tái sinh từ tro tàn.",
    Price = 3000000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715288897/lnurbeskfpvii2um21fm.png",
    Type = "Aó khoác",
    Brand = "DirtyCoins",
    QuantityInStock = 96,
    PublicId = "lnurbeskfpvii2um21fm"
},
new Product
{
    Id = 2,
    Name = "Nike SB Skate",
    Description = "Hãy mặc chiếc áo thun cotton cỡ trung, rộng rãi này của Nike SB và chào mừng Năm con Rồng. Đồ họa lấy cảm hứng từ khối gỗ đặt chiếc tee này lên trên cùng của ngăn xếp của bạn.",
    Price = 900000,
    PictureUrl = "/images/products/Nike1.png",
    Type = "T-Shirt",
    Brand = "Nike",
    QuantityInStock = 100,
    PublicId = "NULL"
},
new Product
{
    Id = 3,
    Name = "Nike Sportswear",
    Description = "Áo thun thể thao Nike trang bị cho bạn chiếc áo jersey cotton mềm mại và logo cổ điển trên ngực.",
    Price = 700000,
    PictureUrl = "/images/products/nike.png",
    Type = "T-Shirt",
    Brand = "Nike",
    QuantityInStock = 100,
    PublicId = "NULL"
},
new Product
{
    Id = 4,
    Name = "ÁO HOODIE VALENTINE",
    Description = "Được khai thác thông qua Better Cotton sử dụng hệ thống cân bằng khối lượng và do đó sản phẩm này có thể không chứa chất liệu Better Cotton",
    Price = 2200000,
    PictureUrl = "/images/products/Ao_Hoodie_Valentine_DJo_IN2300_21_model.avif",
    Type = "Hoodie",
    Brand = "Adidas",
    QuantityInStock = 100,
    PublicId = "NULL"
},
new Product
{
    Id = 5,
    Name = "KR OP TP",
    Description = "Machine wash cold delicate cycle",
    Price = 3000000,
    PictureUrl = "/images/products/Adidas/KR_OP_TP_DJen_IZ4920_21_model.avif",
    Type = "Quần dài",
    Brand = "Adidas",
    QuantityInStock = 97,
    PublicId = "NULL"
},
new Product
{
    Id = 6,
    Name = "Puma x One Piece T7",
    Description = "Bộ sưu tập Puma x One Piece chính là sự kết hợp giữa thế giới manga và phong cách thể thao, mang đến siêu phẩm đường phố cực chất. Lấy cảm hứng từ Monkey D. Luffy, Puma tái hiện lại phom dáng quần T7 kinh điển, sở hữu họa tiết in toàn bộ lấy cảm hứng từ mái tóc của Luffy, hứa hẹn sẽ là nét chấm phá đầy cá tính giúp bạn tự tin bứt phá mọi chuyến phiêu lưu.",
    Price = 1999000,
    PictureUrl = "/images/products/Puma/01_624671_1_02421f08cae7498facc1141a244d7ddb_large.webp",
    Type = "Quần dài",
    Brand = "Puma",
    QuantityInStock = 100,
    PublicId = "NULL"
},
new Product
{
    Id = 7,
    Name = "QUẦN SHORT KẺ SỌC NHỎ SPRINTER",
    Description = "Vải jacquard làm từ 100% polyester tái chế",
    Price = 1600000,
    PictureUrl = "/images/products/Adidas/Quan_Short_Ke_Soc_Nho_Sprinter_mau_xanh_la_IR9389_21_mode.avif",
    Type = "Quần short",
    Brand = "Adidas",
    QuantityInStock = 100,
    PublicId = "NULL"
},
new Product
{
    Id = 24,
    Name = "ÁO THUN BA LÁ ADICOLOR",
    Description = "Được khai thác thông qua Better Cotton sử dụng hệ thống cân bằng khối lượng và do đó sản phẩm này có thể không chứa chất liệu Better Cotton",
    Price = 950000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715606913/oj03evb9sgurzjspetmq.avif",
    Type = "T-Shirt",
    Brand = "Adidas",
    QuantityInStock = 100,
    PublicId = "oj03evb9sgurzjspetmq"
},
new Product
{
    Id = 25,
    Name = "ÁO THUN GRAPHIC CAMO BADGE OF SPORT",
    Description = "Được khai thác thông qua Better Cotton sử dụng hệ thống cân bằng khối lượng và do đó sản phẩm này có thể không chứa chất liệu Better Cotton",
    Price = 700000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715607011/zmht0vaqc4zqomd9vvj8.avif",
    Type = "T-Shirt",
    Brand = "Adidas",
    QuantityInStock = 100,
    PublicId = "zmht0vaqc4zqomd9vvj8"
},
new Product
{
    Id = 26,
    Name = "KR OP JKT",
    Description = "WASH WITH HOOK AND LOOP CLOSED",
    Price = 3000000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715607078/oeblvlh5afojwzfpe1ka.avif",
    Type = "Aó khoác",
    Brand = "Adidas",
    QuantityInStock = 100,
    PublicId = "oeblvlh5afojwzfpe1ka"
},
new Product
{
    Id = 27,
    Name = "ÁO KHOÁC FLAMES",
    Description = "Vải dệt trơn làm từ 100% nylon tái chế",
    Price = 3200000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715607182/moryj3cx5qxamk10setl.avif",
    Type = "Aó khoác",
    Brand = "Adidas",
    QuantityInStock = 100,
    PublicId = "moryj3cx5qxamk10setl"
},
new Product
{
    Id = 28,
    Name = "QUẦN SHORT 2 TRONG 1 YOGA PREMIUM DESIGNED FOR TRAINING",
    Description = "Đợt phát hành này hiện đã mở bán cho các hội viên adiClub như bạn. Gia nhập câu lạc bộ để có thêm giảm giá, mức thưởng dành riêng cho hội viên và trải nghiệm trước những thứ bạn thích.",
    Price = 1600000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715608378/hopwrjwikk0lnzxf0k32.avif",
    Type = "Quần short",
    Brand = "Adidas",
    QuantityInStock = 100,
    PublicId = "hopwrjwikk0lnzxf0k32"
},
new Product
{
    Id = 29,
    Name = "CLS ST PANTS M",
    Description = "Machine wash cold delicate cycle",
    Price = 2400000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715608441/kkpstpzgy1szycvi0kas.avif",
    Type = "Quần dài",
    Brand = "Adidas",
    QuantityInStock = 99,
    PublicId = "kkpstpzgy1szycvi0kas"
},
new Product
{
    Id = 30,
    Name = "NOCTA",
    Description = "This premium sweatshirt features new exclusive fleece with reflective design piping, a silicone Swoosh logo and standard NOCTA branding. Guarantees both style and comfort.",
    Price = 2759000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715608781/lmchxfjiawyfviemerru.webp",
    Type = "Hoodie",
    Brand = "Nike",
    QuantityInStock = 100,
    PublicId = "lmchxfjiawyfviemerru"
},
new Product
{
    Id = 31,
    Name = "Nike Solo Swoosh",
    Description = "This warm fleece hoodie is made with some extra room through the shoulders, chest and body for easy comfort and laid-back, nostalgic style. The thick, stretchy ribbing on the cuffs and hem help hold the hoodie in place and give a premium feel. Our solo Swoosh is embroidered on the left chest to keep your look clean and effortless.",
    Price = 2299000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715608828/e23e3devic3jjtuqyop0.jpg",
    Type = "Hoodie",
    Brand = "Nike",
    QuantityInStock = 100,
    PublicId = "e23e3devic3jjtuqyop0"
},
new Product
{
    Id = 32,
    Name = "Nike Dri-FIT Form",
    Description = "Designed for running, training and yoga, these versatile shorts are built to handle those days when you need to shake up your exercise routine. Our sweat-wicking Form Shorts offer a smooth feel and a minimal fit made to keep up with your moves, from tough dead lifts to sweaty hot yoga classes.",
    Price = 1019000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715608888/jpxlqo462ikew1b13fbw.webp",
    Type = "Quần short",
    Brand = "Nike",
    QuantityInStock = 98,
    PublicId = "jpxlqo462ikew1b13fbw"
},
new Product
{
    Id = 33,
    Name = "Nike Flex Stride Run Energy",
    Description = "A legendary competitor and record-holder, Steve Prefontaine is considered one of the most legendary runners in history. Celebrate this trailblazer of the sport with these 13cm (approx.) Stride running shorts. Light and breathable with a supportive brief liner, these shorts feature 'Stop Pre' graphics that keep Pre's rebel spirit alive.",
    Price = 1579000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715608938/svxrtdam5fcznfejcxpj.webp",
    Type = "Quần short",
    Brand = "Nike",
    QuantityInStock = 99,
    PublicId = "svxrtdam5fcznfejcxpj"
},
new Product
{
    Id = 34,
    Name = "Nike Sportswear",
    Description = "Made from durable woven fabric, the Nike Sportswear Jacket has a relaxed, loose fit while watercolour graphics across the back complement the tonal panel-blocking.",
    Price = 2039000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715609000/ujky7ebxb3qjvcpe0vkh.webp",
    Type = "Aó khoác",
    Brand = "Nike",
    QuantityInStock = 100,
    PublicId = "ujky7ebxb3qjvcpe0vkh"
},
new Product
{
    Id = 35,
    Name = "Nike Repel Miler",
    Description = "An essential piece to your running game gets an update on the Nike Repel Miler Jacket. It's built to take on wet weather with a water-repellent design and a hood. The packable design features a look steeped in Nike's heritage. This product is made from 100% recycled polyester fibres.",
    Price = 1939000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715609050/opzqco7dt1uilccbgerx.webp",
    Type = "Aó khoác",
    Brand = "Nike",
    QuantityInStock = 100,
    PublicId = "opzqco7dt1uilccbgerx"
},
new Product
{
    Id = 36,
    Name = "Nike Running Division",
    Description = "Day or night, rain or shine, Nike Running Division offers the features you need to navigate the concrete, cars and zebra crossing of the paved landscape. These Dri-FIT ADV trousers have stretchy, sweat-wicking fabric to help you stay dry, plus UV protection for those sunny days. A slim fit and tapered design minimises distractions so you can focus on your run.",
    Price = 2759000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715609140/e9bntbhrxtqe1hfsqehn.webp",
    Type = "Quần dài",
    Brand = "Nike",
    QuantityInStock = 100,
    PublicId = "e9bntbhrxtqe1hfsqehn"
},
new Product
{
    Id = 37,
    Name = "Nike Unlimited",
    Description = "Built for running, training and yoga, the Unlimited collection helps keep you moving throughout the year, thanks to premium materials and innovative features. These relaxed-fit trousers have plenty of stretch and wick sweat to keep you feeling cool and dry. Take your keys, cash and valuables to and from the gym with our 3 zip pockets and let your focus be on reaching the goals you set today.",
    Price = 1839000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715609196/o2gzqka3lnfnrzycq62b.webp",
    Type = "Quần dài",
    Brand = "Nike",
    QuantityInStock = 100,
    PublicId = "o2gzqka3lnfnrzycq62b"
},
new Product
{
    Id = 38,
    Name = "Áo Thun Nam Puma X One Piece Aop - Đen",
    Description = "Sự kết hợp giữa PUMA và ONE PIECE đánh dấu bước giao thoa giữa thế giới manga và thể thao, tạo nên phong cách thời trang đường phố ấn tượng. Lấy cảm hứng từ hình ảnh uy lực của Tứ Hoàng trong ONE PIECE, mẫu áo thun này in họa tiết bắt mắt của cả bốn vị vua này, giúp bạn thể hiện niềm đam mê và sự cuồng nhiệt với bộ truyện.",
    Price = 1299000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715609317/wkw7mpfeyxzpc9ylpvtb.webp",
    Type = "T-Shirt",
    Brand = "Puma",
    QuantityInStock = 100,
    PublicId = "wkw7mpfeyxzpc9ylpvtb"
},
new Product
{
    Id = 39,
    Name = "Áo Thun Nam Puma Graphics Wave - Xanh Mint",
    Description = "Mèo PUMA lướt sóng? Những điều kỳ lạ đã xảy ra ngoài khung cửa tô điểm cho chiếc áo thun GRAPHICS Wave thông qua bản in cao su độc đáo.",
    Price = 480000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715609498/ms7yfkuqqvqfynpjyalu.webp",
    Type = "T-Shirt",
    Brand = "Puma",
    QuantityInStock = 100,
    PublicId = "ms7yfkuqqvqfynpjyalu"
},
new Product
{
    Id = 40,
    Name = "Quần Ngắn Thời Trang Nam Puma Power Woven - Đen",
    Description = "Được chế tạo từ các loại vải cotton mềm mại, đồng thời nổi bật với kiểu dáng hiện đại, bộ sưu tập PUMA POWER với phong cách thể thao pha thêm chút tinh tế. Những chiếc quần đùi này có đường cắt cổ điển, túi bên lưu trữ các vật dụng cần thiết và logo puma được in rõ nét.",
    Price = 600000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715609652/ps6y2lyfebk7cms06ghb.webp",
    Type = "Quần short",
    Brand = "Puma",
    QuantityInStock = 100,
    PublicId = "ps6y2lyfebk7cms06ghb"
},
new Product
{
    Id = 41,
    Name = "Quần Ngắn Thời Trang Nam Puma Classics Brand Love - Đen",
    Description = "Quần Ngắn Nam Puma Classics Brand Love Aop 8\" không chỉ là một chiếc quần ngắn thông thường, mà còn là một tuyên ngôn về tình yêu đối với thương hiệu PUMA. Với sự sáng tạo trong thiết kế và họa tiết nổi bật, chiếc quần này giúp bạn tỏa sáng và thể hiện phong cách riêng của mình. Nó đồng thời mang đến sự thoải mái và tiện ích cho mọi hoạt động của bạn.",
    Price = 900000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715609722/qeoqpuyyfs2sasrk1oet.webp",
    Type = "Quần short",
    Brand = "Puma",
    QuantityInStock = 100,
    PublicId = "qeoqpuyyfs2sasrk1oet"
},
new Product
{
    Id = 42,
    Name = "Quần Jogger Nữ Puma Modern - Đen",
    Description = "Chiếc quần thể thao hiện đại này sở hữu đường may tôn dáng và với mặt bên thiết kế nổi bật. Phần thắt lưng co giãn tốt với dây rút có thể điều chỉnh phù hợp với nhu cầu của bạn.",
    Price = 1020000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715609799/yddbhmzwgl89mkrwhzzi.webp",
    Type = "Quần dài",
    Brand = "Puma",
    QuantityInStock = 100,
    PublicId = "yddbhmzwgl89mkrwhzzi"
},
new Product
{
    Id = 43,
    Name = "Áo Khoác Nam Puma Iconic T7 Track - Đen",
    Description = "Là bản gốc của PUMA, bộ sưu tập lấy cảm hứng từ đường đua T7 đã tạo nên tên tuổi với các sọc đặc trưng 7 cm và nhanh chóng trở nên phổ biến trên đường phố cũng như trên sân tập. Ẩn mình trong kho lưu trữ của chúng tôi, bộ đồ này đã được \"nâng cấp\" với một phiên bản hoàn thiện hơn. Đường sọc ở tay áo và kiểu dáng đẹp, chiếc áo khoác thể thao này sẽ giúp bạn mang phong cách cổ điển trở lại.",
    Price = 1450000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715610048/uqyklbopyadduvnbly14.webp",
    Type = "Áo khoác",
    Brand = "Puma",
    QuantityInStock = 100,
    PublicId = "uqyklbopyadduvnbly14"
},
new Product
{
    Id = 44,
    Name = "Áo Khoác Nam Puma Puma X One Piece Varsity Woven Putty - Be",
    Description = "Đã là fan hâm mộ của bộ truyện tranh One Piece thì không thể bỏ qua bộ sưu tập Puma x One Piece mới nhất! Áo Khoác Nam Puma X One Piece Varsity Woven Putty là một điểm nhấn đặc biệt trong bộ sưu tập, dành cho những tín đồ thời trang yêu thích phong cách đường phố cá tính cùng One Piece. Chiếc áo khoác này không chỉ mang đến phong cách thời trang đường phố năng động mà còn là món quà tuyệt vời dành cho những người hâm mộ Luffy và băng hải tặc",
    Price = 4400000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715610180/rb50hmtw6gqgnguygvds.webp",
    Type = "Áo khoác",
    Brand = "Puma",
    QuantityInStock = 100,
    PublicId = "rb50hmtw6gqgnguygvds"
},
new Product
{
    Id = 45,
    Name = "Áo hoodie nam phối zip Fit Double Knit",
    Description = "Áo hoodie Fit Double Knit của Puma là sự kết hợp hoàn hảo giữa phong cách và thoải mái. Có thiết kế đơn giản với dây rút và túi tiện lợi phía trước giúp bạn dễ dàng điều chỉnh, trên nền chất liệu vải cao cấp, chiếc áo này sẽ mang lại một cảm giác ấm áp và êm ái dành cho bạn. Không cần phô trương nhưng Fit Double Knit vẫn sẽ khiến bạn trở thành tâm điểm của sự chú ý bởi sự bí ẩn và thu hút đặc biệt.",
    Price = 2599000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715611593/dlllappf5aaqmxdrdkib.webp",
    Type = "Hoodie",
    Brand = "Puma",
    QuantityInStock = 100,
    PublicId = "dlllappf5aaqmxdrdkib"
},
new Product
{
    Id = 46,
    Name = "Áo hoodie nữ DARE TO",
    Description = "Bộ sưu tập DARE TO kết hợp những họa tiết hình ảnh từ trang phục thể thao mùa đông với tính thẩm mỹ trong game để tạo ra những món đồ cần thiết cho tủ đồ vừa thời trang, vừa sẵn sàng cho những hoạt động ngoài trời. Chiếc áo hoodie phom rộng này được thiết kế với túi kangaroo lớn ở phía trước cùng nút bấm và mũ trùm đầu, sẽ mang lại vẻ cho bạn ngoài năng động, phóng khoáng.",
    Price = 2399000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715611649/eiudqzicbb8phm2eelsh.webp",
    Type = "Hoodie",
    Brand = "Puma",
    QuantityInStock = 100,
    PublicId = "eiudqzicbb8phm2eelsh"
},
new Product
{
    Id = 48,
    Name = "Áo thun Dirty Coins x GAM University T-shirt - Black",
    Description = "• Hình in mặt trước và sau được áp dụng công nghệ in kéo lụa.",
    Price = 390000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715611902/wd4kcxzf6tbydvzajqtj.jpg",
    Type = "T-Shirt",
    Brand = "DirtyCoins",
    QuantityInStock = 100,
    PublicId = "wd4kcxzf6tbydvzajqtj"
},
new Product
{
    Id = 49,
    Name = "Áo thun Dirty Coins x GAM GAMTIME T-shirt - Black",
    Description = "Hình in mặt trước được áp dụng công nghệ in kéo lụa.",
    Price = 390000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715611968/n4jr80xry2q9zu575t6k.jpg",
    Type = "T-Shirt",
    Brand = "DirtyCoins",
    QuantityInStock = 100,
    PublicId = "n4jr80xry2q9zu575t6k"
},
new Product
{
    Id = 50,
    Name = "Quần DirtyCoins Baggy Jeans - Green Wash",
    Description = "Quần DirtyCoins Baggy Jeans - Green Wash",
    Price = 699000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715612036/z8pkeyl1xhs8ikb5rzhe.jpg",
    Type = "Quần dài",
    Brand = "DirtyCoins",
    QuantityInStock = 100,
    PublicId = "z8pkeyl1xhs8ikb5rzhe"
},
new Product
{
    Id = 51,
    Name = "Quần DirtyCoins Comfy Essential Jeans - Moss Blue",
    Description = "Quần DirtyCoins Comfy Essential Jeans - Moss Blue",
    Price = 699000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715612108/ecxig3f2cmljlugselx7.jpg",
    Type = "Quần dài",
    Brand = "DirtyCoins",
    QuantityInStock = 100,
    PublicId = "ecxig3f2cmljlugselx7"
},
new Product
{
    Id = 52,
    Name = "Quần DirtyCoins Logo Mesh Shorts",
    Description = "Quần DirtyCoins Logo Mesh Shorts",
    Price = 350000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715612188/xeqc92owdimoqblrodxv.jpg",
    Type = "Quần short",
    Brand = "DirtyCoins",
    QuantityInStock = 100,
    PublicId = "xeqc92owdimoqblrodxv"
},
new Product
{
    Id = 53,
    Name = "Áo Khoác DirtyCoins Logo Washed Hoodie - Green",
    Description = "Áo Khoác DirtyCoins Logo Washed Hoodie - Green",
    Price = 599000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715612260/ql9pntkmqkxvdvpujbrp.jpg",
    Type = "Hoodie",
    Brand = "DirtyCoins",
    QuantityInStock = 100,
    PublicId = "ql9pntkmqkxvdvpujbrp"
},
new Product
{
    Id = 54,
    Name = "Áo Hoodie DirtyCoins Chingu Form Rộng Mũ Trùm Vải Nỉ Bông Cao Cấp",
    Description = "Áo Hoodie DirtyCoins Chingu Form Rộng Mũ Trùm Vải Nỉ Bông Cao Cấp",
    Price = 150000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715612343/o8qnrff6xzb9fohnh28v.jpg",
    Type = "Hoodie",
    Brand = "DirtyCoins",
    QuantityInStock = 99,
    PublicId = "o8qnrff6xzb9fohnh28v"
},
new Product
{
    Id = 55,
    Name = "Áo Khoác DirtyCoins Logo Denim Jacket - Blue Wash",
    Description = "Áo Khoác DirtyCoins Logo Denim Jacket - Blue Wash",
    Price = 699000,
    PictureUrl = "https://res.cloudinary.com/dak0yvkya/image/upload/v1715612405/n6hgrjvdoil6tknuwx9l.jpg",
    Type = "Áo khoác",
    Brand = "DirtyCoins",
    QuantityInStock = 98,
    PublicId = "n6hgrjvdoil6tknuwx9l"
}



            };

        foreach (var product in products)
        {
            context.Products.Add(product);
        }

        context.SaveChanges();
    }
}