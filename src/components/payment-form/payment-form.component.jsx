
import { async } from "@firebase/util";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        // pass the amount value in as a request to our netlify function
        // netlify works with functions as if they are API endpoints

        // pass route relative to application URL 
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 100 }),
          }).then((res) => {
            return res.json();
          });
      
        // fetch request to back end in order to create a payment intent
        // payment intent is essentially something that stripe creates so that it knows that there is a payment coming and this payment intents is what Stripe uses to actually confirm that there's a final payment about to happen.
        console.log(response);
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPES_CLASSES.inverted}>Pay now</Button>
            </FormContainer>
        </PaymentFormContainer>
    )
};


export default PaymentForm;