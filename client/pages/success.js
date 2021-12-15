import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

const Success = () => {
  const router = useRouter()
  const {stripeData: data, cart} = router.query
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            token: `Bearer ${currentUser.accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: cart.total,
            address: data.billing_details.address,
          }
        });
        setOrderId(res.data._id);
      } catch {
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successful. Your order is being prepared...`}
      <button style={{padding: 10, marginTop: 20}}>Go to Homepage</button>
    </div>
  );
};

export default Success;
