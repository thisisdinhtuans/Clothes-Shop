import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

//chỗ này có thể thêm là any, tức là có thể nhận mọi thứ vào vẫn chạy bình thường, nhưng chúng ta đã khai báo interface Props ở trên thì kế thừa luôn từ cái Props đấy
export default function Catalog() {
    //sử dụng hook useState để khởi tạo một state products là 1 mảng chứa danh sách các sản phẩm. Mỗi sản phẩm được đại diện bởi một đối tượng có 2 thuocj tish là name và price
  const [products, setProducts]=useState<Product[]>([]);
  const [loading, setLoading]=useState(true);
  //sử dụng hook useEffect trong React để thực hiện các thao tác có liên quan đến slide effects, chẳng hạn như gọi api khi component được render
  //1. useEffect nhận vào 1 hàm callBack và 1 mảng dependency. Trong trường hợp mảng dependency được truyền vào là [], nghĩa là useEffect sẽ chỉ được gọi 
  // một lần sau khi component được render lần đầu tiên và không có dependency nào được cung cấp.
  //2. trong hàm callBack của useEffect, một yêu cầu fetch được thực hiện đến endpoint 'http://localhost:5000/api/Products' để lấy dữ liệu về sản phẩm. Đây là 1 api sử dụng phương thức GET
  //3. sau khi nhận được phản hồi từ api dưới dạng json, hàm .json() được gọi để chuyển dữ liệu phản hòi thành dạng JSON
  //4. dữ liệu JSON đó được chuyển đến hàm setProducts để cập nhật state 'products' trong component React với dữ liệu mới lấy từ api. Khi setProducts được gọi, component sẽ được render lại với dữ liệu sản phẩm mới
  //Tóm lại, đoạn mã trên sử dụng useEffect để gọi API khi component được render lần đầu tiên và cập nhật state products của component với dữ liệu sản phẩm từ API.
  useEffect(()=> {
    agent.Catalog.list()
    .then(products =>setProducts(products))
    .catch(error=>console.log(error))
    .finally(()=>setLoading(false))
  }, [])
  if(loading)return <LoadingComponent message='Loading products...'/>

    return (
        <>
            <ProductList products={products}/>
            {/* nút addProduct được hiển thị bên dưới danh sách sản phẩm , khi người dùng bấm vào nút này thì hàm addProduct() sẽ được gọi để thêm 1 sản phẩm mới vào danh sách */}
        </>
    )
}