import React from "react";

export default function Card({ product, onCheckout }) {
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={product.image}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            CATEGORY
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {product?.title}
          </h1>
          <p className="leading-relaxed mb-3">{product?.description}</p>
        </div>
        <div className="flex items-center flex-wrap mb-2">
          <button
            className="bg-black text-white px-6 py-2 rounded-sm"
            onClick={()=>onCheckout({name:product?.title,amount:product?.price})}
          >
            Pay Now &#8377; {product?.price}
          </button>
        </div>
      </div>
    </div>
  );
}
