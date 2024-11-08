import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import banner from '../assets/image/main-banner.jpg'
import banner_1 from '../assets/image/banner-1.jpg'
import banner_2 from '../assets/image/banner-2.jpg'
import APIs, { endpoints } from '../configs/APIs';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'aos/dist/aos.css';



const Home = () => {
  
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Khởi tạo với thời gian 1 giây cho mỗi hiệu ứng
  }, []);

  

  


  
  const Carousel = () => {
    // Cấu hình cho carousel
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      
    };
  
    return (
      <div className="relative w-full h-screen">
        <Slider {...settings} className="h-screen">
          <div className="h-screen">
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${banner})` }}
            >
            </div>
          </div>
          <div className="h-screen">
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${banner_1})` }}
            >
            </div>
          </div>
          <div className="h-screen">
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${banner_2})` }}
            >
            </div>
          </div>
        </Slider>
      </div>
    );
  };

  
  
  


  return (
    <div>
      <div className="relative h-screen">
    {/* Phần background */}
    <div className="absolute inset-0 flex-1 flex items-center justify-center">
      <Carousel />
      
    </div>  
     
    {/* Phần content */}
    <div className="relative z-10 flex flex-col md:flex-row h-full items-center justify-center p-8">
      <div className="min-w-[600px] flex-1 max-w-md mx-auto bg-white opacity-60">
        <h1 className="text-4xl font-bold text-sky-600 my-5 text-center">HỘ KINH DOANH TRUNG KHOA</h1>
        <p className="text-sky-600 text-lg font-semibold my-5 text-center">NHÀ CUNG CẤP TRÁI CÂY SỐ 1 VIỆT NAM</p>
 
      </div>
    </div>

    </div>
      
      
    </div>
  );
};

export default Home;