import React from "react";
import { ArrowRight } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [form, setForm] = React.useState({
      name: "",
      email: "",
      phone: "03",
      address: "",
      password: "",
      confirmPassword: "",
   });
   const [errors, setErrors] = React.useState({});
   const [loading, setLoading] = React.useState(false);

   const validate = () => {
      const newErrors = {};
      if (!form.name.trim()) newErrors.name = "Name is required.";
      if (!form.email) newErrors.email = "Email is required.";
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Invalid email address.";
      if (!form.phone || form.phone.length !== 12) newErrors.phone = "Phone number is required and must be in 03xx-xxxxxxx format.";
      else if (!/^03\d{2}-\d{7}$/.test(form.phone)) newErrors.phone = "Phone must be in 03xx-xxxxxxx format.";
      if (!form.address.trim()) newErrors.address = "Address is required.";
      if (!form.password) newErrors.password = "Password is required.";
      else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
      if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
      else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
      return newErrors;
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "phone") {
         let phone = value.replace(/[^\d]/g, ""); // Only digits
         if (!phone.startsWith("03")) phone = "03" + phone.replace(/^0+/, "");
         if (phone.length > 11) phone = phone.slice(0, 11);
         // Insert dash after 4 digits
         if (phone.length > 4) phone = phone.slice(0, 4) + "-" + phone.slice(4);
         setForm({ ...form, phone });
      } else {
         setForm({ ...form, [name]: value });
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
         setLoading(true);
         try {
            await setDoc(doc(db, "Users", form.email), {
               name: form.name,
               email: form.email,
               phone: form.phone.replace(/-/g, ""),
               address: form.address,
               password: form.password,
               createdAt: new Date().toISOString(),
            });
            const userObj = { name: form.name, email: form.email };
            dispatch(setUser(userObj));
            localStorage.setItem("user", JSON.stringify(userObj));
            setLoading(false);
            navigate("/");
         } catch (error) {
            setLoading(false);
            alert("Error saving user: " + error.message);
         }
      }
   };

   if (loading) {
      return (
         <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="flex flex-col items-center">
               <svg className="animate-spin h-10 w-10 text-yellow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
               </svg>
               <span className="mt-4 text-lg font-semibold text-yellow">Signing you up...</span>
            </div>
         </div>
      );
   }

   return (
      <>
         <Navbar />
         <section>
            <div className="grid grid-cols-1 lg:grid-cols-2">
               <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                  <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                     <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                        Sign Up
                     </h2>
                     <form onSubmit={handleSubmit} className="mt-8">
                        <div className="space-y-5">
                           <div>
                              <label className="text-base font-medium text-gray-900">Full Name</label>
                              <div className="mt-2">
                                 <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Full Name"
                                 />
                                 {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                              </div>
                           </div>
                           <div>
                              <label className="text-base font-medium text-gray-900">Email address</label>
                              <div className="mt-2">
                                 <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Email"
                                 />
                                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                              </div>
                           </div>
                           <div>
                              <label className="text-base font-medium text-gray-900">Phone Number</label>
                              <div className="mt-2">
                                 <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="tel"
                                    placeholder="03xx-xxxxxxx"
                                    maxLength={12}
                                 />
                                 {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                              </div>
                           </div>
                           <div>
                              <label className="text-base font-medium text-gray-900">Address</label>
                              <div className="mt-2">
                                 <input
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Address"
                                 />
                                 {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                              </div>
                           </div>
                           <div>
                              <label className="text-base font-medium text-gray-900">Password</label>
                              <div className="mt-2">
                                 <input
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                 />
                                 {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                              </div>
                           </div>
                           <div>
                              <label className="text-base font-medium text-gray-900">Confirm Password</label>
                              <div className="mt-2">
                                 <input
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Confirm Password"
                                 />
                                 {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                              </div>
                           </div>
                           <div>
                              <button
                                 type="submit"
                                 className="inline-flex w-full items-center justify-center rounded-md bg-yellow px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-black/80 hover:text-white">
                                 Get started{" "}
                                 <ArrowRight className="ml-2" size={16} />
                              </button>
                           </div>
                        </div>
                     </form>
                     <div className="mt-3 space-y-3">
                        <button
                           type="button"
                           className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black ">
                           <span className="inline-block mr-2">
                              <svg
                                 className="w-6 h-6 text-rose-500"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor">
                                 <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                              </svg>
                           </span>
                           Sign in with Google
                        </button>
                        <button
                           type="button"
                           className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100">
                           <span className="inline-block mr-2">
                              <svg
                                 className="h-6 w-6 text-[#2563EB]"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 fill="currentColor">
                                 <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                              </svg>
                           </span>
                           Sign in with Facebook
                        </button>
                     </div>
                  </div>
               </div>
               <div className="w-full h-full">
                  <img
                     className="object-cover w-full h-full mx-auto rounded-md"
                     src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                     alt=""
                  />
               </div>
            </div>
         </section>

         <Footer />
      </>
   );
};

export default SignUp;
