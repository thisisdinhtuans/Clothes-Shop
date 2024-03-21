import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";

const sortOptions=[
  {value:'name',label:'Alphabetical'},
  {value:'priceDesc',label:'Price - High to low'},
  {value:'price',label:'Price - Low to high'},
]

//chỗ này có thể thêm là any, tức là có thể nhận mọi thứ vào vẫn chạy bình thường, nhưng chúng ta đã khai báo interface Props ở trên thì kế thừa luôn từ cái Props đấy
export default function Catalog() {
    //sử dụng hook useState để khởi tạo một state products là 1 mảng chứa danh sách các sản phẩm. Mỗi sản phẩm được đại diện bởi một đối tượng có 2 thuocj tish là name và price
  const products=useAppSelector(productSelectors.selectAll);
  const {productsLoaded,status,filtersLoaded, brands, types}=useAppSelector(state=>state.catalog);
  const dispatch=useAppDispatch();
  //sử dụng hook useEffect trong React để thực hiện các thao tác có liên quan đến slide effects, chẳng hạn như gọi api khi component được render
  //1. useEffect nhận vào 1 hàm callBack và 1 mảng dependency. Trong trường hợp mảng dependency được truyền vào là [], nghĩa là useEffect sẽ chỉ được gọi 
  // một lần sau khi component được render lần đầu tiên và không có dependency nào được cung cấp.
  //2. trong hàm callBack của useEffect, một yêu cầu fetch được thực hiện đến endpoint 'http://localhost:5000/api/Products' để lấy dữ liệu về sản phẩm. Đây là 1 api sử dụng phương thức GET
  //3. sau khi nhận được phản hồi từ api dưới dạng json, hàm .json() được gọi để chuyển dữ liệu phản hòi thành dạng JSON
  //4. dữ liệu JSON đó được chuyển đến hàm setProducts để cập nhật state 'products' trong component React với dữ liệu mới lấy từ api. Khi setProducts được gọi, component sẽ được render lại với dữ liệu sản phẩm mới
  //Tóm lại, đoạn mã trên sử dụng useEffect để gọi API khi component được render lần đầu tiên và cập nhật state products của component với dữ liệu sản phẩm từ API.
  useEffect(()=> {
    if(!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded,dispatch])

  useEffect(()=>{
    if(!filtersLoaded) dispatch(fetchFilters());
  },[dispatch, filtersLoaded])

  if(status.includes('pending'))return <LoadingComponent message='Loading products...'/>

    return (
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Paper sx={{mb:2}}>
              <TextField 
                label='Search products'
                variant='outlined'
                fullWidth
              />
            </Paper>
            <Paper sx={{mb:2, p:2}}>
              <FormControl>
                <RadioGroup>
                  {sortOptions.map(({value, label})=>(
                    <FormControlLabel value={value} control={<Radio />} label={label}  key={value}/>
                  ))}
                </RadioGroup>
              </FormControl>
            </Paper>

            <Paper sx={{mb:2, p:2}}>
              <FormGroup>
                {brands.map(brand=>(
                  <FormControlLabel control={<Checkbox />} label={brand} key={brand}/>
                ))}
              </FormGroup>
            </Paper>

            <Paper sx={{mb:2, p:2}}>
              <FormGroup>
                {types.map(type=>(
                  <FormControlLabel control={<Checkbox />} label={type} key={type}/>
                ))}
              </FormGroup>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <ProductList products={products}/>
          </Grid>
          <Grid item xs={3}/>
          <Grid item xs={9}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography>
                    Displaying 1-6 of 20 items
                  </Typography>
                  <Pagination 
                    color='secondary'
                    size='large'
                    count={10}
                    page={2}
                  />
            </Box>
          </Grid>
            {/* nút addProduct được hiển thị bên dưới danh sách sản phẩm , khi người dùng bấm vào nút này thì hàm addProduct() sẽ được gọi để thêm 1 sản phẩm mới vào danh sách */}
        </Grid>
    )
}