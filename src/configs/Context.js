import React, { createContext, useState, useContext } from 'react';

export const MyUserContext = createContext();
export const MyDispatchContext = createContext();
export const LanguageContext = createContext();


// Tạo Provider component cho xác thực
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Hàm đăng nhập
  const login = (userData) => {
    setUser(userData);
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
  };

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={{ login, logout }}>
        {children}
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
};

// Custom hook để sử dụng MyUserContext
export const useUser = () => {
  return useContext(MyUserContext);  // Lấy thông tin người dùng từ MyUserContext
};

