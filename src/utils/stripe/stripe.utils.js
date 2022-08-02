/**
 *  Create and instantiate Stripe instance.
 */
import { loadStripe } from "@stripe/stripe-js"; // loadStripe is what runs in order for us to actually know that this is our Stripe instance 


// react will merge this file with our process environment
// all of the those key value pairs are accessible on process
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
