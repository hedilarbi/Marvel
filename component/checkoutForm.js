import React , {useState } from 'react';
import {CardElement , useStripe , useElements ,CardNumberElement,CardCvcElement,CardExpiryElement } from '@stripe/react-stripe-js';
import {destroyCookie} from 'nookies';
import  '../styles/style.css'
const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        padding: '10px 12px',
        color: '#32325d',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

const CheckoutForm = ({paymentIntent}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [checkoutError , setCheckoutError] = useState();
    const [checkoutSuccess, setCheckoutSuccess] = useState();
    const handleSumbit = async e => {
        e.preventDefault();
        try {
            const {error , paymentIntent:{status}} = await stripe.confirmCardPayment(paymentIntent.client_secret , {
                payment_method: {
                    card: elements.getElement(CardNumberElement)
                }
                
            });

            if(error ) throw new Error (error.message)

            if(status === 'succeeded') {
                destroyCookie(null , "paymentIntentId");
                setCheckoutSuccess(true);
            }
        }
        catch(err){
          
            setCheckoutError(err.message);
        }

    };

    if (checkoutSuccess) return <p>i took ur money xD</p>
    return (
        <div className="w-1/3 p-6 my-20 mx-auto rounded-lg  shadow-xs bg-gray-500 ">
        <form onSubmit ={handleSumbit}>
            
            <label>
        Card number
        <CardNumberElement
          options={CARD_ELEMENT_OPTIONS}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
         
         options={CARD_ELEMENT_OPTIONS}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={CARD_ELEMENT_OPTIONS}
        />
      </label>
             <button type="submit" disabled={!stripe}>
                 make your payment
             </button>
             
    {checkoutError && <span style={{color:"red"}}>{checkoutError}</span>}
        </form>
        </div>
    );

}

export default CheckoutForm ;