import { Product } from "../../app/models/product";

//Phân biệt mảng ở Props này nha, vì nó sẽ 
interface Props {
    products:Product[];
    addProduct:() => void;
}

//chỗ này có thể thêm là any, tức là có thể nhận mọi thứ vào vẫn chạy bình thường, nhưng chúng ta đã khai báo interface Props ở trên thì kế thừa luôn từ cái Props đấy
export default function Catalog({products, addProduct}:Props) {
    return (
        <>
            <ul>
            {/* sử dụng phương thức map để lặp qua mảng products và render mỗi sản phẩm với name và price */}
            {products.map(product=>(
            <li key={product.id}>{product.name} - {product.price}</li>
            ))}
            </ul>
            {/* nút addProduct được hiển thị bên dưới danh sách sản phẩm , khi người dùng bấm vào nút này thì hàm addProduct() sẽ được gọi để thêm 1 sản phẩm mới vào danh sách */}
            <button onClick={addProduct}>Add product</button>
        </>
    )
}