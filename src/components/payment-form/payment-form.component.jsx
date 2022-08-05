import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector,useDispatch } from "react-redux";
import { clearAllFromCart } from "../../store/cart/cart.action";
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { PaymentButton, PaymentFormContainer, FormContainer } from "./payment-form.styles";

// fire action to clear the cart 
// make order confirmation page
const PaymentForm = () => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isPrcoessingPayment, setIsProcessingPayment] = useState(false);
    // select all the cart Items
    // const cartItems = useSelector(selectCartItems);
    
    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);
        // pass the amount value in as a request to our netlify function
        // netlify works with functions as if they are API endpoints

        // pass route relative to application URL 
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 }),
          }).then((res) => {
            return res.json();
          });
          
        // fetch request to back end in order to create a payment intent
        // payment intent is essentially something that stripe creates so that it knows that there is a payment coming and this payment intents is what Stripe uses to actually confirm that there's a final payment about to happen.
        // console.log(response);

        const { paymentIntent: { client_secret } } = response;
        // console.log(client_secret);

        // confirmCardPayment is the card payment method for cards.
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser? currentUser.displayName :'Guest',
                }
            }
        })
        setIsProcessingPayment(false);
        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status == 'succeeded') {
                alert('payment successful');
                dispatch(clearAllFromCart());
            }
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton isLoading={isPrcoessingPayment}
                    buttonType={BUTTON_TYPES_CLASSES.inverted}>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;