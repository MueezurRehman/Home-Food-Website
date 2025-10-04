import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import FoodCard from "./FoodCard";
import favImg from "../assets/fav.png";

// Dynamically import all png images in assets folder
const images = import.meta.glob("../assets/*.png", { eager: true, import: 'default' });

function getImageForItem(name) {
   const key = name.toLowerCase().replace(/\s+/g, "");
   // Try to find an image with the same name
   for (const path in images) {
      if (path.includes(`/${key}.png`)) {
         return images[path];
      }
   }
   return favImg;
}

const FoodItems = () => {
   const [foods, setFoods] = React.useState([]);
   const [loading, setLoading] = React.useState(true);
   const handleToast = (name) => toast.success(` added ${name} to cart`);

   React.useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "menuItems"), (querySnapshot) => {
         try {
            const items = querySnapshot.docs
               .map(doc => {
                  const data = doc.data();
                  return {
                     id: doc.id,
                     name: data.name,
                     price: data.price,
                     desc: data.desc,
                     img: getImageForItem(data.name),
                     availability: data.availability,
                  };
               })
               .filter(item => item.availability === true);
            setFoods(items);
         } catch (err) {
            toast.error("Failed to load menu items");
         } finally {
            setLoading(false);
         }
      });
      return () => unsubscribe();
   }, []);

   return (
      <>
         <Toaster position="top-center" reverseOrder={false} />
         <div className="py-5">
            <span className="flex items-center justify-center lg:w-full lg:h[100vw] lg:my-14">
               <h1 className="text-2xl font-bold lg:text-5xl">
                  Today's <span className="font-serif text-yellow">Meals,</span>{" "}
                  directly from our <span className="font-serif text-yellow">Kitchen.</span>
               </h1>
            </span>
            <div className="flex flex-wrap justify-center gap-10 lg:mx-20">
               {loading ? (
                  <div className="text-lg">Loading...</div>
               ) : (
                  foods.map((food) => (
                     <FoodCard
                        key={food.id}
                        id={food.id}
                        name={food.name}
                        price={food.price}
                        desc={food.desc}
                        img={food.img}
                        handleToast={handleToast}
                     />
                  ))
               )}
            </div>
         </div>
      </>
   );
};

export default FoodItems;
