import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/Auth/useAuth";
import { toast } from "react-toastify";

const CheckoutForm = ({ paymentCheck, total , discountAmount }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (total > 0) {
            const fetchClientSecret = async () => {
                try {
                    const res = await axiosSecure.post('/create-payment', { price: total });
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                } catch (err) {
                    console.error('Error creating payment intent:', err);
                }
            };

            fetchClientSecret();
        }
    }, [total, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (methodError) {
            console.log('Payment error', methodError);
            setError(methodError.message);
            return;
        }

        setError('');
        console.log('Payment method', paymentMethod);

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('Confirm error', confirmError);
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            console.log('Transaction id', paymentIntent.id);

            // Save the payment in the database
            const payment = {
                email: user.email,
                paymentUser:user.displayName,
                price: total,
                discount: discountAmount,
                transactionId: paymentIntent.id,
                date: new Date(),
                status: 'pending',
                product:paymentCheck
            };

            try {
                const res = await axiosSecure.post('/payments-products', payment)
                
                console.log('Payment saved', res.data);
                if (res.data?.insertedId) {
                    const deleteProduct =async () =>{
                        const {data} = await axiosSecure.delete(`/buy-product/delete`);
                        return data
                    }
                    deleteProduct()
                    toast.success('Payment was successfully')
                    navigate(`/invoide/${paymentIntent.id}`);
                }
            } catch (error) {
                console.error('Error saving payment:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#000000',
                            '::placeholder': {
                                color: '#2f2b2b',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="border border-blue-800 py-1 px-4 mt-8 mb-3 rounded-lg font-bold" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            
        </form>
    );
};

export default CheckoutForm;
