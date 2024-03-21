import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products:Product[];
}

export default function ProductList({products}:Props) {
    return(
    <Grid container spacing={4}>
        {/* sử dụng phương thức map để lặp qua mảng products và render mỗi sản phẩm với name và price */}
        {products.map(product=>(
            //chỗ này xs={3} hoặc {4} thì chính là độ rộng của nó, là 12. Nếu 3 thì đc 4 sản phẩm, 4 thfi đc 3 sản phẩm
            <Grid item xs={4} key={product.id}>
                <ProductCard product={product} />
            </Grid>
        ))}
    </Grid>
    )
}