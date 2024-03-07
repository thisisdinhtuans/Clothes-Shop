import { List } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products:Product[];
}

export default function ProductList({products}:Props) {
    return(
    <List>
        {/* sử dụng phương thức map để lặp qua mảng products và render mỗi sản phẩm với name và price */}
        {products.map(product=>(
            <ProductCard key={product.id} product={product} />
        ))}
    </List>
    )
}