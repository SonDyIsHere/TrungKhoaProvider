import React, { useContext, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from '../../assets/image/travel.png';
import { FaHome, FaBriefcase, FaSignInAlt, FaUserPlus, FaUser, FaCaretDown, FaUserCog, FaListAlt, FaQuestion, FaInfoCircle } from 'react-icons/fa';
import { MyUserContext, MyDispatchContext } from '../../configs/Context';

const Header = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const nav = useNavigate();

  const handleLogout = () => {
    dispatch({ "type": "logout" });
    nav('/');
  };

  return (
    <header className="bg-sky-600 flex fixed w-full top-0 z-50">
      <div className="w-[30%] flex items-center">
        <Link to='/'>
          <div className="flex items-center ml-7">
            <img src={logo} alt="Logo" className="h-12 w-12 mr-5" />
            <h1 className="text-white text-3xl font-bold font-serif">TRUNG KHOA</h1>
          </div>
        </Link>
      </div>
      <div className="flex items-center ml-auto">
        <nav className="p-4 flex justify-center items-center">
          <ul className="flex space-x-8">
            <li className="text-center group">
              <Link to="/" className="text-white group-hover:text-yellow-400">
                <FaHome className="text-white group-hover:text-yellow-400 mx-auto" />
                Trang chủ

              </Link>
            </li>
            
          
            {user && user.role === 2 && (
              <li className="text-center group">
                <Link to="/manage" className="text-white group-hover:text-yellow-400">
                  <FaUserCog className="text-white group-hover:text-yellow-400 mx-auto" />
                  Manage
                </Link>
              </li>
            )}
            {/* Dropdown cho Danh mục */}
            <li className="text-center group relative">
              <button className="text-white group-hover:text-yellow-400 flex items-center">
              <Link to="/destinations" className="text-white group-hover:text-yellow-400">
                <FaListAlt className="text-white group-hover:text-yellow-400 mx-auto" />
                Danh mục
              </Link>
             
              </button>
              {/* Dropdown nội dung */}
              <div className="absolute font-bold left-0 border-2 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link to="/inventory-board" className="block border-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                  Xuất nhập tồn
                </Link>
                <Link to="/convertion" className="block border-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                  Bảng quy đổi
                </Link>
                <Link to="/attendance" className="block border-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                  Bảng chấm công
                </Link>
              </div>
            </li>

            <li className="text-center group">
              <Link to="/" className="text-white group-hover:text-yellow-400">
                <FaInfoCircle className="text-white group-hover:text-yellow-400 mx-auto" />
                Giới thiệu

              </Link>
            </li>
          </ul>
        </nav>
        <div className="h-10 w-px bg-gray-300 mx-2"></div>
        <div className="ml-3">
          {user && user.role !== null ? (
            <div className="relative group">
              <button className="text-white hover:text-yellow-400 mx-5 flex flex-col items-center">
                <FaUser className="inline mr-2 my-1" />
                <div className="flex items-center">
                  <span className="text-sm">Profile</span>
                  <FaCaretDown className="ml-1" />
                </div>
              </button>
              {/* Dropdown list */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link to={"/profile"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Tài khoản
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-yellow-400 ml-3">
                <FaSignInAlt className="inline mr-1" /> Đăng nhập
              </Link>
              <Link to="/register" className="text-white hover:text-yellow-400 mx-3 mr-7">
                <FaUserPlus className="inline mr-1" /> Đăng kí
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
