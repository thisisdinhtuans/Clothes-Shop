import { useEffect, useState } from "react";

function App() {
  //sử dụng hook useState để khởi tạo một state products là 1 mảng chứa danh sách các sản phẩm. Mỗi sản phẩm được đại diện bởi một đối tượng có 2 thuocj tish là name và price
  const [products, setProducts]=useState([
    {name:'product1', price:100.00},
    {name:'product2', price:200.00},
  ]);
  //sử dụng hook useEffect trong React để thực hiện các thao tác có liên quan đến slide effects, chẳng hạn như gọi api khi component được render
  //1. useEffect nhận vào 1 hàm callBack và 1 mảng dependency. Trong trường hợp mảng dependency được truyền vào là [], nghĩa là useEffect sẽ chỉ được gọi 
  // một lần sau khi component được render lần đầu tiên và không có dependency nào được cung cấp.
  //2. trong hàm callBack của useEffect, một yêu cầu fetch được thực hiện đến endpoint 'http://localhost:5000/api/Products' để lấy dữ liệu về sản phẩm. Đây là 1 api sử dụng phương thức GET
  //3. sau khi nhận được phản hồi từ api dưới dạng json, hàm .json() được gọi để chuyển dữ liệu phản hòi thành dạng JSON
  //4. dữ liệu JSON đó được chuyển đến hàm setProducts để cập nhật state 'products' trong component React với dữ liệu mới lấy từ api. Khi setProducts được gọi, component sẽ được render lại với dữ liệu sản phẩm mới
  //Tóm lại, đoạn mã trên sử dụng useEffect để gọi API khi component được render lần đầu tiên và cập nhật state products của component với dữ liệu sản phẩm từ API.
  useEffect(()=> {
    fetch('http://localhost:5000/api/Products')
      .then(response=>response.json())
      .then(data=>setProducts(data))
  }, [])

  //hàm addProduct để định nghĩa để thêm 1 sản phẩm mới vào danh sách products, hàm nầy sử dụng setProducts để cập nhật state products. Thay vì trực tiếp sử dụng mảng products hiện tại, nó sử dụng sử dụng hàm callback của setProducts và truyền vào tham số prevState, đại diện cho giá trị trước đó của products. Sau đó, ns tạo ra 1 mảng mới bằng cash sao chép prevState và thêm 1 sản phẩm mới vào cuối mảng đó
  function addProduct() {
    setProducts(prevState=>[...prevState, {name:'product'+(prevState.length+1), price: (prevState.length*100)+100}]);
  }
  //đây là phần trả về component
  return (
    <div>
      <h1>Re-Store</h1>
      <ul>
        {/* sử dụng phương thức map để lặp qua mảng products và render mỗi sản phẩm với name và price*/}
        {products.map((item, index)=>(
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
      {/* nút addProduct được hiển thị bên dưới danh sách sản phẩm , khi người dùng bấm vào nút này thì hàm addProduct() sẽ được gọi để thêm 1 sản phẩm mới vào danh sách */}
      <button onClick={addProduct}>Add product</button>
    </div>
  )
}

export default App
