import React from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
   return (
      <section className="px-4 py-10 mx-auto max-w-7xl ">
         <div>
            <div className="max-w-3xl mx-auto lg:text-center">
               <h2 className="text-3xl font-bold te:xt-black lg:leading-tight sm:text-4xl lg:text-5xl">
                  Frequently Asked{" "}
                  <span className="font-serif text-yellow">Questions</span>
               </h2>
            </div>
            <div className="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 md:mt-16 md:grid-cols-2">
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     What precautions are you taking for food safety and
                     hygiene?
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     At Apa ka Dhaba, hygiene is our top priority. All meals are prepared in a clean home kitchen with proper sanitization. We use fresh ingredients, wear gloves while cooking and packing, and ensure contactless delivery so you can enjoy safe and healthy food every time.
                  </p>
               </div>
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     Do you change or update the menu daily?
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     Yes, our menu changes every day to bring variety and freshness. Only selected dishes are made available daily, and you can see the updated list on our website.
                  </p>
               </div>
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     Do you offer a monthly food package or subscription?
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     Yes, we offer a monthly food package for our regular clients. This requires advance payment for the month. Your balance will be maintained properly, and you can order daily until your credit runs out. It’s a convenient way to enjoy home-cooked food without worrying about daily payments.
                  </p>
               </div>
               <div>
                  <h2 className="text-xl font-semibold text-black">
                     What if I want to cancel or change my order?
                  </h2>
                  <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                     You can cancel or change your order by contacting us within 15–20 minutes of placing it. Once the food is prepared, cancellations may not be possible. To cancel or change your order, please call or message us directly on WhatsAp.
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
};

export default FAQ;
