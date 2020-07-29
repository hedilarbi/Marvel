import Stripe from 'stripe';
import { parseCookies, setCookie } from 'nookies';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../component/checkoutForm';


const stripePromise = loadStripe("pk_test_51H9WLfFG2v9rYQQOf3v1Kp6qYIEgEBk9OblNusx2WC7AGGlbncOjUCzvvKMLbZzSfDn9Z1Jtlm8x8Aoo5pSNrLep00EPagO5Ej");

export const getServerSideProps = async (ctx) => {
    const stripe = new Stripe('sk_test_51H9WLfFG2v9rYQQOBCOV2ppzpFn0NKxx60NqNFY05Zoc0zMDqOMjlIHWFLdnCnQTjqemWGMASRB9wr2aqr1zeIUG002wiIp6Jm');
    
    let paymentIntent;
    const { paymentIntentId } = await parseCookies(ctx);

    if (paymentIntentId) {
        paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        return {
            props: {
                paymentIntent
            }
        }
    }


    paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: "usd"
    });

    setCookie(ctx, "paymentIntentId", paymentIntent.id);
    return {
        props: {
            paymentIntent
        }
    }
}


const checkoutPage = ({paymentIntent}) => (
    <Elements stripe={stripePromise}>
        <CheckoutForm paymentIntent={paymentIntent} />
    </Elements>

);

export default checkoutPage;