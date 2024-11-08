import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Loading from './Loading'; // Component Loading của bạn

const LoadingLayout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Bắt đầu loading khi thay đổi route
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 500);

    return () => clearTimeout(timer); // Xóa bộ đếm khi component unmount
  }, [location]);

  return (
    <>
      {loading ? (
        <Loading /> // Hiển thị loading trong khi tải
      ) : (
        <Outlet /> // Outlet sẽ render trang con tương ứng
      )}
    </>
  );
};

export default LoadingLayout;
