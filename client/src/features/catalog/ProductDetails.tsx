import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export default function ProductDetails() {
    const {basket,setBasket, removeItem} =useStoreContext();
    //Hook useParams được sử dụng để lấy các tham số từ URL. trong trường hợp này, id được trích xuất từ URL để viết sản phẩm cụ thế mà chúng ta đam xem chi tiết
    const {id} = useParams<{id:string}>();
    //useState được sử dụng để khởi tạo state trong component. product được khởi tạo với giá trị ban đầu là null và loading được khởi tạo với giá trị ban đầu là true
    const [product, setProduct]=useState<Product | null>(null);
    const [loading, setLoading]=useState(true);
    const [quantity, setQuantity] =useState(0);
    const [submitting, setSubmitting]=useState(false);
    const item = basket?.items.find(i =>i.productId===product?.id);
    //úeEffect được sử dụng để thực hiện tác vụ liên quan đến slide effects trong component. trong trường hợp này, nó được sử dụng để gửi yêu cầu HTTPGET đến endpoint http://localhost:5000/api/Products/${id} đẻ lấy thông tin chi tiết của sản phẩm với id tương ứng. khi nhận được phản hồi từ api, product được cập nhật với dữ liệu của sản phẩm, và biến loading được đặt lại là false
    //ngoài ra nếu có lỗi trong quá trình gửi yêu cầu, lỗi được in ra console. 
    useEffect(()=> {
        if(item)  setQuantity(item.quantity);
        id&&agent.Catalog.details(parseInt(id))
            .then(response=>setProduct(response))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false));
    //truyền cái item vào để lấy số lượng đã cho vào giỏ
    },[id, item])


    function handleInputChange(event:ChangeEvent<HTMLInputElement>) {
        if(parseInt(event.currentTarget.value)>=0){
            setQuantity(parseInt(event.currentTarget.value));
        }
    }

    function handleUpdateCart() {
        if(!product) return;
        setSubmitting(true);
        if(!item || quantity>item.quantity) {
            const updatedQuantity=item ? quantity - item.quantity:quantity;
            agent.Basket.addItem(product.id, updatedQuantity)
                .then(basket=>setBasket(basket))
                .catch(error=>console.log(error))
                .finally(()=>setSubmitting(false))
        } else {
            const updatedQuantity=item.quantity - quantity;
            agent.Basket.removeItem(product.id, updatedQuantity)
                .then(()=> removeItem(product.id, updatedQuantity))
                .catch(error=>console.log(error))
                .finally(()=>setSubmitting(false))
        }
    }
    //Kiểm tra trạng thái loading: Nếu loading là true, hiển thị một thông báo "Loading..." cho đến khi dữ liệu sản phẩm được tải hoàn tất.
    if(loading) return <LoadingComponent message='Loading product...' />
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
                <Typography variant='h5' color='secondary'>${(product.price/100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
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
                            loading ={submitting}
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