/**
 * Netlify use AWS lamda function, which is essentially a specific resource on the AWS cloud configuaration
 * that allows us to create these functions that run for 10 seconds roughly
 */

// attach all of secret variables on the dotenv file onto our process environment.
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async (event) => {
    try {
        const { amount } = JSON.parse(event.body);
        const paymentIntent = await stripe.paymentIntent.create({
            amount,
            currency: 'cad',
            payment_method_types: ['card']
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent })
        }
    } catch (error) {
        // console.log({ error });
        return {
            statusCode: 400,
            body: JSON.stringify({ error }),
        };
    }
};
