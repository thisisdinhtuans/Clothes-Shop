import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";



interface Props {
    product:Product;
}

export default function ProductCard({product}:Props) {
  const [loading, setLoading]=useState(false);

  function handleAddItem(productId:number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false))
  }
    return (
        <Card>
            <CardHeader
            avatar={
                <Avatar sx={{bgcolor:'secondary.main'}}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={product.name}
            //Xem color ở phần 
            titleTypographyProps={{sx:{fontWeight:'bold', color:'primary.main'}}}
            />
      <CardMedia
      //cái bgcolor kia thì bỏ cx đc tại để xanh xanh ở cái nền sản phẩm trông không đẹp
        sx={{height:140, backgroundSize: 'container', bgcolor:'primary.light'}}
        // component="img"
        // alt="green iguana"
        // height="140"
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant="h5">
          ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton 
          loading={loading} 
          onClick={()=>handleAddItem(product.id)} 
          size="small">Add To Cart</LoadingButton>
        {/* cái Link này phải import react-router-dom, import sai là lỗi đó */}
        <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
      </CardActions>
    </Card>
        // <ListItem key={product.id}>
        //     <ListItemAvatar>
        //         <Avatar src={product.pictureUrl}></Avatar>
        //     </ListItemAvatar>
        //     <ListItemText>{product.name} - {product.price}</ListItemText>
        // </ListItem>
    )
}