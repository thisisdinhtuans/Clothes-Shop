import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { setPageNumber, setProductParams } from "./catalogSlice";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButton";
import AppPagination from "../../app/components/AppPagination";
import useProducts from "../../app/hooks/useProducts";

const sortOptions=[
  {value:'name',label:'Alphabetical'},
  {value:'priceDesc',label:'Price - High to low'},
  {value:'price',label:'Price - Low to high'},
]

//chỗ này có thể thêm là any, tức là có thể nhận mọi thứ vào vẫn chạy bình thường, nhưng chúng ta đã khai báo interface Props ở trên thì kế thừa luôn từ cái Props đấy
export default function Catalog() {
  const {products, brands, types, filtersLoaded, metaData}=useProducts();
  const {productParams}=useAppSelector(state=>state.catalog);
  const dispatch=useAppDispatch();

  if(!filtersLoaded)return <LoadingComponent message='Loading products...'/>

    return (
        <Grid container columnSpacing={4}>
          <Grid item xs={3}>
            <Paper sx={{mb:2}}>
              <ProductSearch/>
            </Paper>
            <Paper sx={{mb:2, p:2}}>
              <RadioButtonGroup 
                selectedValue={productParams.orderBy}
                options={sortOptions}
                onChange={(e)=>dispatch(setProductParams({orderBy:e.target.value}))}  
              />
            </Paper>
            <Paper sx={{ p: 2, mb: 2 }}>
                    <CheckboxButtons
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                    />
                </Paper>
                <Paper sx={{ p: 2 }}>
                    <CheckboxButtons
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                    />
                </Paper>
          </Grid>
          <Grid item xs={9}>
            <ProductList products={products}/>
          </Grid>
          <Grid item xs={3}/>
          <Grid item xs={9} sx={{mb:2}}>
            {metaData&&
            <AppPagination 
              metaData={metaData}
              onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}
            />}
          </Grid>
            {/* nút addProduct được hiển thị bên dưới danh sách sản phẩm , khi người dùng bấm vào nút này thì hàm addProduct() sẽ được gọi để thêm 1 sản phẩm mới vào danh sách */}
        </Grid>
    )
}