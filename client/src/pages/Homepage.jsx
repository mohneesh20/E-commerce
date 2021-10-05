import React from 'react';
// import {Row,Col} from 'react-bootstrap';
import './Homepage.css';
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from '../components/Navbar';
import Newsletter from "../components/Newsletter";
import Products from "../components/Product";
import Slider from '../components/Slider';
function HomePage(){
return(
    <>
    <div>
       <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
    </>
    );
}
export default HomePage;