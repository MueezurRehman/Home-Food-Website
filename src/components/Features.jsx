import React from "react";
import { DollarSign, Zap, Moon, Filter } from "lucide-react";

const Features = () => {
   return (
      <div className="px-4 py-5 mx-auto my-10 max-w-7xl sm:px-6 lg:px-8">
         <div className="max-w-xl mx-auto text-center">
            <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
               We Cook
               <span className="text-yellow"> Nostalgic Bites. </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
               Discover, indulge, and elevate your culinary experience with Apa Ka Dhaba. We're not just helping you find delicious home madefood, we're
               making it even better. Join us for a flavorful journey like no
               other.
            </p>
         </div>
         <div className="grid grid-cols-1 p-4 mt-12 mb-6 text-center shadow-xl gap-y-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 rounded-2xl bg-tan">
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <DollarSign className="text-cream h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-cream">
                  Cash on Delivery
               </h3>
               <p className="mt-4 text-sm text-cream te">
                  Order with confidence, enjoy payments at the time of delivery for a worry-free
                  experience.
               </p>
            </div>
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <Zap className="text-cream h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-cream">
                  Fast & Easy to Search
               </h3>
               <p className="mt-4 text-sm text-cream">
                  Effortless indulgence: Fast and easy food searching at your
                  fingertips.
               </p>
            </div>
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <Moon className="text-cream h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-cream">
                  Meal Time Delivery
               </h3>
               <p className="mt-4 text-sm text-cream">
                  Satisfy your cravings anytime, anywhere with meal time delivery
                  because we understand your hunger keeps regular
                  hours.
               </p>
            </div>
            <div>
               <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full ">
                  <Filter className="text-cream h-9 w-9" />
               </div>
               <h3 className="mt-8 text-lg font-semibold text-cream">
                  Daily Menu Update
               </h3>
               <p className="mt-4 text-sm text-cream">
                  Tailor your cravings with precision. Select your preferences from our daily menu
                   for a personalized culinary experience.
               </p>
            </div>
         </div>
      </div>
   );
};

export default Features;
