import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";

const FoodCard = ({ id, name, price, desc, img, rating, handleToast }) => {
   const dispatch = useDispatch();

   return (
      <div
         className="font-bold w-[250px] bg-tan p-5 flex flex-col rounded-2xl gap-2 shadow-xl
      ">
         <img
            src={img || require("../assets/fav.png")}
            alt={name}
            className="w-auto h-[130px] rounded-lg hover:scale-110 cursor-grab transition-all duration-500 ease-in-out "
         />
         <div className="flex justify-between text-sm">
            <h2>{name}</h2>
            <span className="text-yellow ">Rs. {price}</span>
         </div>
         <p className="text-sm font-normal">{desc ? desc.slice(0, 40) : "No description"}...</p>
         <div className="flex justify-between ">
            {/* <span className="flex items-center justify-center">
               <AiFillStar className="mr-1 text-yellow" /> {rating}
            </span> */}

            {/* Add to Cart */}
            <button
               onClick={() => {
                  dispatch(addToCart({ id, name, price, rating, img, qty: 1 }));
                  handleToast(name);
               }}
               className="px-3 py-2 text-sm text-yellow rounded-lg bg-cream hover:text-cream hover:bg-yellow">
               Add to cart
            </button>
         </div>
      </div>
   );
};

export default FoodCard;
