import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";
import { currencyFormat } from "../../app/util/util";

export default function ProductDetails() {
    const {basket, status} =useAppSelector(state=>state.basket);
    const dispatch=useAppDispatch();
    //Hook useParams được sử dụng để lấy các tham số từ URL. trong trường hợp này, id được trích xuất từ URL để viết sản phẩm cụ thế mà chúng ta đam xem chi tiết
    const {id} = useParams<{id:string}>();
    const product = useAppSelector(state => productSelectors.selectById(state, parseInt(id!)));
    const {status:productStatus}=useAppSelector(state=>state.catalog);
    const [quantity, setQuantity] =useState(0);
    const item = basket?.items.find(i =>i.productId===product?.id);
    //úeEffect được sử dụng để thực hiện tác vụ liên quan đến slide effects trong component. trong trường hợp này, nó được sử dụng để gửi yêu cầu HTTPGET đến endpoint http://localhost:5000/api/Products/${id} đẻ lấy thông tin chi tiết của sản phẩm với id tương ứng. khi nhận được phản hồi từ api, product được cập nhật với dữ liệu của sản phẩm, và biến loading được đặt lại là false
    //ngoài ra nếu có lỗi trong quá trình gửi yêu cầu, lỗi được in ra console. 
    useEffect(()=> {
        if(item)  setQuantity(item.quantity);
        if(!product&&id) dispatch(fetchProductAsync(parseInt(id)));
    //truyền cái item vào để lấy số lượng đã cho vào giỏ
    },[id, item,dispatch, product])


    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        if(parseInt(event.currentTarget.value)>=0){
            setQuantity(parseInt(event.currentTarget.value));
        }
    }

    function handleUpdateCart() {
        if(!product) return;
        if(!item || quantity>item.quantity) {
            const updatedQuantity=item ? quantity - item.quantity:quantity;
            dispatch(addBasketItemAsync({productId:product?.id, quantity:updatedQuantity}))
        } else {
            const updatedQuantity=item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId:product?.id, quantity:updatedQuantity}))
        }
    }
    //Kiểm tra trạng thái loading: Nếu loading là true, hiển thị một thông báo "Loading..." cho đến khi dữ liệu sản phẩm được tải hoàn tất.
    if(productStatus.includes('pending')) return <LoadingComponent message='Đang tải sản phẩm...' />
    //Kiểm tra trạng thái product: Nếu product là null, hiển thị một thông báo "Product not found" để thông báo rằng sản phẩm không được tìm thấy.
    if(!product)return <NotFound />
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt ={product.name} style={{width:'100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant='h5' color='secondary'>{currencyFormat(product.price)} đ</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Tên</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Mô tả</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Loại</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Thương hiệu</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Số lượng trong kho</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container  spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                        onChange={handleInputChange}
                        variant='outlined'
                        type='number'
                        label='Quantity in Cart'
                        fullWidth
                        value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity===quantity||!item &&quantity===0}
                            loading ={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height:'55px'}}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity':'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}