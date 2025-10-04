import React from "react";
import { Link } from "react-router-dom";
import userImage1 from '../assets/users/1.png';
import userImage2 from '../assets/users/2.png';
import userImage3 from '../assets/users/3.png';
import userImage4 from '../assets/users/4.png';

const Join = () => {
   return (
      <div className=" lg:flex lg:w-full lg:h-[40vw] lg:items-center lg:justify-center lg:bg-tan lg:-my-10">
         <section className="pt-10 my-10 ">
            <div className="mx-auto max-w-7xl">
               <div className="max-w-2xl mx-auto text-center">
                  <div className="flex justify-center -space-x-2 isolate">
                     <img
                        className="relative z-30 inline-block rounded-full h-14 w-14 ring-4 ring-yellow"
                        src={userImage1}
                        alt="Dan_Abromov"
                     />
                     <img
                        className="relative z-20 inline-block rounded-full h-14 w-14 ring-4 ring-yellow"
                        src={userImage2}
                        alt="Guillermo_Rauch"
                     />
                     <img
                        className="relative z-10 inline-block rounded-full h-14 w-14 ring-4 ring-yellow"
                        src={userImage3}
                        alt="Lee_Robinson"
                     />
                     <img
                        className="relative z-0 inline-block rounded-full h-14 w-14 ring-4 ring-yellow"
                        src={userImage4}
                        alt="Delba"
                     />
                  </div>

                  <h2 className="mt-8 text-2xl font-bold leading-tight text-black sm:text-4xl lg:mt-12 lg:text-5xl">
                     Join <span className="border-b-8 border-cream">1000+</span>{" "}
                     other Fooders
                  </h2>
                  <p className="max-w-xl mx-auto mt-6 text-base text-gray-600 md:mt-10 lg:text-xl">
                     Indulge in a world of flavors. Join us at{" "}
                     <span className="text-cream">Apa Ka Dhaba</span> and savor the
                     beauty of delicious moments. Culinary joy awaits – sign up
                     today!
                  </p>
                  <button>
                     <Link
                        to={"/signIn"}
                        type="button"
                        className="px-3 py-2 mt-8 text-sm font-semibold text-yellow bg-cream rounded-md shadow-sm hover:text-cream hover:bg-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                        Join Now
                     </Link>
                  </button>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Join;
