import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
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
            <List>
            {/* sử dụng phương thức map để lặp qua mảng products và render mỗi sản phẩm với name và price */}
            {products.map(product=>(
                <ListItem key={product.id}>
                    <ListItemAvatar>
                        <Avatar src={product.pictureUrl}></Avatar>
                    </ListItemAvatar>
                    <ListItemText>{product.name} - {product.price}</ListItemText>
                </ListItem>
            ))}
            </List>
            {/* nút addProduct được hiển thị bên dưới danh sách sản phẩm , khi người dùng bấm vào nút này thì hàm addProduct() sẽ được gọi để thêm 1 sản phẩm mới vào danh sách */}
            <Button variant='contained' onClick={addProduct}>Add product</Button>
        </>
    )
}