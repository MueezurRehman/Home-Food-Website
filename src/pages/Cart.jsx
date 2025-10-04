import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CartItems from "../components/CartItems";

const Cart = () => {
   const cartItems = useSelector((state) => state.cart.cart);
   const user = useSelector((state) => state.user.user);

   const [form, setForm] = useState({
      name: "",
      phone: "",
      address: "",
      meal: ""
   });

   // Fetch user info from Firestore if logged in
   useEffect(() => {
      const fetchUserInfo = async () => {
         if (user && user.email) {
            const q = doc(db, "Users", user.email);
            const userSnap = await getDoc(q);
            if (userSnap.exists()) {
               const data = userSnap.data();
               setForm(f => ({
                  ...f,
                  name: data.name || "",
                  phone: data.phone || "",
                  address: data.address || ""
               }));
            }
         }
      };
      fetchUserInfo();
   }, [user]);


   // Calculate Total Price
   const totalPrice = cartItems.reduce(
      (total, item) => total + item.qty * item.price,
      0
   );

   // Place Order Handler
   const [placing, setPlacing] = useState(false);
   const [orderError, setOrderError] = useState("");

   const handlePlaceOrder = async () => {
      // Validation: cart not empty, all fields filled, meal selected
      if (cartItems.length === 0) {
         setOrderError("Your cart is empty.");
         return;
      }
      if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.meal) {
         setOrderError("Please fill all fields and select a meal.");
         return;
      }
      setPlacing(true);
      setOrderError("");
      try {
         for (const cartItem of cartItems) {
            const menuDoc = await getDoc(doc(db, "menuItems", cartItem.id));
            let cost = menuDoc.exists() ? (menuDoc.data().cost || 0) : 0;
            let totalcost = menuDoc.exists() ? (menuDoc.data().cost || 0) * cartItem.qty : 0;
            let price = cartItem.price;
            let totalprice = cartItem.price * cartItem.qty;
            let margin = price - cost;
            const createdAt = Timestamp.now();
            const order = {
               item: cartItem.name,
               quantity: cartItem.qty,
               meal: form.meal,
               name: form.name,
               phone: form.phone.replace(/-/g, ""),
               price: price,
               totalprice: totalprice,
               status: "pending",
               hostel: form.address,
               cost: cost,
               totalcost: totalcost,
               margin: margin,
               createdAt,
            };
            await addDoc(collection(db, "orders"), order);
         }
         setPlacing(false);
         window.location.href = "/success";
      } catch (err) {
         setOrderError("Failed to place order. Please try again.");
         setPlacing(false);
      }
   };

   return (
      <>
         <Navbar />

         <div className="flex flex-col max-w-3xl mx-auto space-y-4 sm:p-10 sm:px-2">
            <div className="px-4 md:px-8">
               <h2 className="text-3xl font-bold ">Your cart</h2>
               <p className="mt-3 text-sm font-medium text-gray-700 ">
                  Add your items in a cart and Order it
               </p>
            </div>

            {/* Cart Items */}
            <div className="">
               <Scrollbars style={{ height: 350 }}>
                  {cartItems.length > 0 ? (
                     cartItems.map((food) => {
                        return (
                           <CartItems
                              key={food.id}
                              id={food.id}
                              name={food.name}
                              price={food.price}
                              img={food.img}
                              rating={food.rating}
                              qty={food.qty}
                           />
                        );
                     })
                  ) : (
                     // If Your Cart is empty
                     <h1 className="flex justify-center text-3xl font-bold">
                        Your cart is empty!
                     </h1>
                  )}
               </Scrollbars>
            </div>

            <div className="px-4 md:px-8">
               {/* User Info Form */}
               <form className="mb-6 p-6 border-2 border-yellow rounded-xl bg-white shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-yellow">Order Details</h3>
                  <div className="mb-4">
                     <label className="block mb-1 font-semibold text-black">Name:</label>
                     <input
                        type="text"
                        className="w-full px-4 py-2 border-2 border-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow bg-gray-50 text-black"
                        placeholder="Your Name"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                     />
                  </div>
                  <div className="mb-4">
                     <label className="block mb-1 font-semibold text-black">Phone Number:</label>
                     <input
                        type="tel"
                        className="w-full px-4 py-2 border-2 border-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow bg-gray-50 text-black"
                        placeholder="03xx-xxxxxxx"
                        required
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                     />
                  </div>
                  <div className="mb-4">
                     <label className="block mb-1 font-semibold text-black">Address/Hostel:</label>
                     <input
                        type="text"
                        className="w-full px-4 py-2 border-2 border-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow bg-gray-50 text-black"
                        placeholder="Address or Hostel"
                        required
                        value={form.address}
                        onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                     />
                  </div>
                  <div className="mb-4">
                     <label className="block mb-1 font-semibold text-black">Meal:</label>
                     <div className="flex gap-6 mt-2">
                        <label className="inline-flex items-center cursor-pointer">
                           <input
                              type="radio"
                              name="meal"
                              value="Lunch"
                              className="form-radio accent-yellow w-5 h-5"
                              required
                              checked={form.meal === "Lunch"}
                              onChange={e => setForm(f => ({ ...f, meal: e.target.value }))}
                           />
                           <span className="ml-2 text-black">Lunch</span>
                        </label>
                        <label className="inline-flex items-center cursor-pointer">
                           <input
                              type="radio"
                              name="meal"
                              value="Dinner"
                              className="form-radio accent-yellow w-5 h-5"
                              required
                              checked={form.meal === "Dinner"}
                              onChange={e => setForm(f => ({ ...f, meal: e.target.value }))}
                           />
                           <span className="ml-2 text-black">Dinner</span>
                        </label>
                     </div>
                  </div>
               </form>
               {/* Total Price */}
               <div className="space-y-1 text-right md:my-2">
                  <p>
                     Total amount:
                     <span className="font-semibold"> Rs. {totalPrice}</span>
                  </p>
               </div>
               <div className="flex flex-col items-end space-y-2">
                  {orderError && (
                     <div className="text-red-600 font-semibold mb-2 text-right" style={{color: '#dc2626'}}>
                        {orderError}
                     </div>
                  )}
                  <div className="flex space-x-4">
                     <Link to={"/menu"}>
                        <button
                           type="button"
                           className="px-3 py-2 text-sm font-semibold text-black border border-black rounded-md shadow-sm">
                           Back to shop
                        </button>
                     </Link>
                     <button
                        type="button"
                        className="px-3 py-2 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black hover:text-white disabled:opacity-60"
                        onClick={handlePlaceOrder}
                        disabled={placing || cartItems.length === 0}
                     >
                        {placing ? "Placing Order..." : "Place Order"}
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </>
   );
};
export default Cart;
