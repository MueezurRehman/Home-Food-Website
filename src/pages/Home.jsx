import React from "react";

//Components
import Navbar from "../components/Navbar";
import FoodItems from "../components/FoodItems";
import Hero from "../components/Hero";
import Join from "../components/Join";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Team from "../components/Team";
import FAQ from "../components/FAQ";

const Home = () => {
   return (
      <>
         <Navbar />
         <div id="home">
            <Hero />
         </div>
         <Join />
         <div id="menu">
            <FoodItems />
         </div>
         <Features />
         <div id="about">
            <Team />
            <FAQ />
         </div>
         <Footer />
      </>
   );
};

export default Home;
