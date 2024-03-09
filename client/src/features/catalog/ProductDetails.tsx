import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

export default function ProductDetails() {
    //Hook useParams được sử dụng để lấy các tham số từ URL. trong trường hợp này, id được trích xuất từ URL để viết sản phẩm cụ thế mà chúng ta đam xem chi tiết
    const {id} = useParams<{id:string}>();
    //useState được sử dụng để khởi tạo state trong component. product được khởi tạo với giá trị ban đầu là null và loading được khởi tạo với giá trị ban đầu là true
    const [product, setProduct]=useState<Product | null>(null);
    const [loading, setLoading]=useState(true);
    //úeEffect được sử dụng để thực hiện tác vụ liên quan đến slide effects trong component. trong trường hợp này, nó được sử dụng để gửi yêu cầu HTTPGET đến endpoint http://localhost:5000/api/Products/${id} đẻ lấy thông tin chi tiết của sản phẩm với id tương ứng. khi nhận được phản hồi từ api, product được cập nhật với dữ liệu của sản phẩm, và biến loading được đặt lại là false
    //ngoài ra nếu có lỗi trong quá trình gửi yêu cầu, lỗi được in ra console. 
    useEffect(()=> {
        axios.get(`http://localhost:5000/api/Products/${id}`)
            .then(response=>setProduct(response.data))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    },[id])
    //Kiểm tra trạng thái loading: Nếu loading là true, hiển thị một thông báo "Loading..." cho đến khi dữ liệu sản phẩm được tải hoàn tất.
    if(loading) return <h3>Loading...</h3>
    //Kiểm tra trạng thái product: Nếu product là null, hiển thị một thông báo "Product not found" để thông báo rằng sản phẩm không được tìm thấy.
    if(!product)return <h3>Product not found</h3>
    //Trả về nội dung của component: Nếu không có trạng thái loading và product đã được tìm thấy, hiển thị tên của sản phẩm bằng cách sử dụng component Typography từ thư viện Material-UI với thuộc tính variant="h2".
    return (
        <Typography variant="h2">
            {product.name}
        </Typography>
    )
}