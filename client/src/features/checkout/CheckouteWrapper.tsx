import {Elements} from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise=loadStripe('pk_test_51P0bzaFL3EFfgVWOIbmNWRyDJBx5rLOMFKZpfmZMnCRxbT3UR9rbN6RLDJ7YW9f5iMom5EkZwKq4JTdVTjrRF4dG00YZorGlwa')

export default function CheckoutWrapper() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}