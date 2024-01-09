import React from "react";
import Card from "../components/Card";
import ProductData from "../api/product.json";
import axios from "axios";

const Product = () => {

  const checkOutHandle = async({name,amount}) => {
    const response = await axios.post("http://localhost:5000/payment/checkout",{
      name,
      amount
    })

    const data = response.data;

    var options = {
      key: "rzp_test_tCH1bRNZUYBZLy",
      amount: data?.amount,
      currency: data?.currency,
      name: name,
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data?.id,
      callback_url: "http://localhost:5000/payment/verification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    console.log(rzp1);
    console.log(data);
  }

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {ProductData.map((c, index) => (
              <Card key={index} product={c} onCheckout={checkOutHandle} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
