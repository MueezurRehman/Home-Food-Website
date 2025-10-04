import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../redux/slices/UserSlice";

const Navbar = () => {
   const user = useSelector((state) => state.user.user);
   const dispatch = useDispatch();
   useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
         dispatch(setUser(JSON.parse(storedUser)));
      }
   }, [dispatch]);

   const [showLogout, setShowLogout] = React.useState(false);
   const logoutRef = useRef();
   const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem("user");
      setShowLogout(false);
   };
   useEffect(() => {
      function handleClickOutside(event) {
         if (logoutRef.current && !logoutRef.current.contains(event.target)) {
            setShowLogout(false);
         }
      }
      if (showLogout) {
         document.addEventListener("mousedown", handleClickOutside);
      } else {
         document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [showLogout]);
   const menuItems = [
         // {
         //    name: "Home",
         //    targetId: "home",
         // },
         {
            name: "About Us",
            targetId: "about",
         },
         {
            name: "Our Delicious Menu",
            targetId: "menu",
         },
      ];

      const handleScroll = (id) => (e) => {
         e.preventDefault();
         const el = document.getElementById(id);
         if (el) {
            el.scrollIntoView({ behavior: "smooth" });
         }
      };
   const [isMenuOpen, setIsMenuOpen] = React.useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <>
         <div className="relative w-full px-4 bg-tan pb-5">
            <div className="flex items-center justify-between py-2 mx-auto max-w-7xl sm:px-6 lg:px-10">
               <Link to={"/"}>
                  <div className="inline-flex items-center space-x-2">
                     <div className="flex flex-col justify-between my-5 lg:flex-row">
                        <div className="">
                           <span className="text-xl text-cream font-thin lg:text-3xl">
                              {new Date().toUTCString().slice(0, 16)}
                           </span>
                           <div className="font-bold text-cream ">
                              合 Home Food by <span className="text-yellow">Apa Ka Dhaba</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </Link>

               <div className="items-start hidden grow lg:flex ">
                  <ul className="inline-flex space-x-8 ml-52">
                        {menuItems.map((item) => (
                           <li key={item.name}>
                              <a
                                 href="/"
                                 onClick={handleScroll(item.targetId)}
                                 className="text-sm font-semibold text-cream transition-all ease-in-out duration-400 hover:text-yellow">
                                 {item.name}
                              </a>
                           </li>
                        ))}
                  </ul>
               </div>

               {/* Cart Icon */}
               {
                  <Link to={"/cart"}>
                     <FaShoppingCart className="ml-10 text-xl text-cream hover:text-yellow lg:text-2xl lg:-mx-12 md:ml-96 sm:ml-80 " />
                  </Link>
               }

               <div className="hidden lg:block relative" ref={logoutRef}>
                  {user ? (
                     <div className="inline-block relative">
                        <span
                           className="w-full px-3 py-2 text-sm font-semibold text-cream rounded-md bg-yellow cursor-pointer"
                           onClick={() => setShowLogout((prev) => !prev)}
                        >
                           {user.name}
                        </span>
                        {showLogout && (
                           <div className="absolute left-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                              <button
                                 onClick={handleLogout}
                                 className="block w-full px-4 py-2 text-left text-black hover:bg-yellow rounded"
                              >
                                 Logout
                              </button>
                           </div>
                        )}
                     </div>
                  ) : (
                     <Link to={"/signIn"}>
                        <button
                           type="button"
                           className="w-full px-3 py-2 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black/80 hover:text-white ">
                           Sign in
                        </button>
                     </Link>
                  )}
               </div>

               {/* Mobile Screen */}
               <div className="lg:hidden">
                  <Menu
                     onClick={toggleMenu}
                     className="w-6 h-6 cursor-pointer"
                  />
               </div>
               {isMenuOpen && (
                  <div className="absolute inset-x-0 top-0 z-50 p-2 transition origin-top-right transform lg:hidden">
                     <div className="bg-white divide-y-2 rounded-lg shadow-lg divide-gray-50 ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                           <div className="flex items-center justify-between">
                              <div className="-mr-2">
                                 <button
                                    type="button"
                                    onClick={toggleMenu}
                                    className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 ">
                                    <span className="sr-only">Close menu</span>
                                    <X className="w-6 h-6" aria-hidden="true" />
                                 </button>
                              </div>
                           </div>
                           <div className="mt-6">
                              <nav className="grid gap-y-4">
                                 {menuItems.map((item) => (
                                    <a
                                       key={item.name}
                                       href="/"
                                       onClick={handleScroll(item.targetId)}
                                       className="flex items-center p-3 -m-3 text-sm font-semibold rounded-md hover:bg-gray-50">
                                       <span className="ml-3 text-base font-medium text-gray-900">
                                          {item.name}
                                       </span>
                                    </a>
                                 ))}
                              </nav>
                           </div>

                           {user ? (
                              <div className="relative" ref={logoutRef}>
                                 <span
                                    className="w-full px-3 py-2 mt-4 text-sm font-semibold text-black rounded-md bg-yellow cursor-pointer"
                                    onClick={() => setShowLogout((prev) => !prev)}
                                 >
                                    {user.name}
                                 </span>
                                 {showLogout && (
                                    <button
                                       onClick={handleLogout}
                                       className="absolute left-0 mt-2 px-4 py-2 bg-white border rounded shadow text-black hover:bg-yellow min-w-full text-left"
                                    >
                                       Logout
                                    </button>
                                 )}
                              </div>
                           ) : (
                              <Link to={"/signIn"}>
                                 <button
                                    type="button"
                                    className="w-full px-3 py-2 mt-4 text-sm font-semibold text-black rounded-md shadow-sm bg-yellow hover:bg-black/80 hover:text-white ">
                                    Sign in
                                 </button>
                              </Link>
                           )}
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default Navbar;
