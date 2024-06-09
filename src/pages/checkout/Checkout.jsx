import useAxiosSecure from "../../hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../../hooks/Auth/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Checkout = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()

  const {
    data: paymentCheck,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["paymentcheck"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/buy-products/${user.email}`);
      return data;
    },
  });

  if (isError) return <h2>Error</h2>;
  if (isLoading) return <h2>Loading...</h2>;
  console.log(paymentCheck)

  const totalGrantedPrice = paymentCheck.reduce(
    (sum, product) => sum + product.discountPrice,
    0
  );


const mainPrice = paymentCheck.reduce((sum, currentValue) => sum + parseInt(currentValue.price), 0);

const grandPrice = mainPrice - totalGrantedPrice
  // console.log(totalGrantedPrice);

  return (
    <div className="my-14">
      <div className="w-[90%] md:w-2/4 mx-auto">
        <div className="my-6 grow sm:mt-8 lg:mt-0">
          <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 ">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Product Counts:{paymentCheck.length}</h2>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 ">
                  Original price
                </dt>
                <dd className="text-base font-medium text-gray-900 ">
                  ${mainPrice}
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 ">
                  Savings
                </dt>
                <dd className="text-base font-medium text-green-500">
                  -${grandPrice}
                </dd>
              </dl>

            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
              <dt className="text-base font-bold text-gray-900 ">Grand Price</dt>
              <dd className="text-base font-bold text-gray-900 ">${totalGrantedPrice}</dd>
            </dl>
          </div>
        </div>
        <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6  py-8 px-5">
          <div className="AppWrapper">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                paymentCheck={paymentCheck}
                total={totalGrantedPrice}
                discountAmount={grandPrice}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
