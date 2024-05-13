import {Elements} from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";

const stripePromise=loadStripe('pk_test_51PEkJvKdwQXjO09oOtXQmAD71g2UUMNoIPiCvwHtS9qVkw2vKYIiHySAccWUJyZOjg9sdG0h50KMDYq1G85lj3Dp00NvjuMqN8')

export default function CheckoutWrapper() {
    const dispatch=useAppDispatch();
    const [loading, setLoading]=useState(true);

    useEffect(()=> {
        agent.Payments.createPaymentIntent()
            .then(basket=>dispatch(setBasket(basket)))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
    },[dispatch]);

    if(loading)return <LoadingComponent message='Tải xuống đặt hàng ...'/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}