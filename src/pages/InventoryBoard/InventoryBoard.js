import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIs, { endpoints } from '../../configs/APIs';
import { format } from 'date-fns'; 

import { BiPencil, BiTrash, BiDotsHorizontalRounded, BiDetail, BiHide } from 'react-icons/bi';

const InventoryBoard = () => {
  const [inventoryBoards, setInventoryBoard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [isHideModalOpen, setIsHideModalOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(null);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const [isClientModalOpen, setIsClientModalOpen] = useState(false)

  const [selectedDate, setSelectedDate] = useState("");

  // Hàm xử lý khi người dùng chọn ngày
  const handleDateChange = (event) => {
    if (!event || !event.target) {
      console.error("Event or event.target is undefined");
      return;
    }

    // Lấy giá trị ngày từ bộ chọn và chuyển sang định dạng yyyy-MM-dd
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    handleSelectChange(selectedDate); // Gọi API với ngày đã được định dạng
  };

  const handleSelectChange = async (boardDate) => {
    try {
      const response = await APIs.get(`${endpoints['get_inventory_board']}${boardDate}/`);
      const data = response.data;
      // Đảm bảo rằng data là một mảng
      if (Array.isArray(data)) {
        setInventoryBoard(data);
      } else {
        console.error("Received data is not an array", data);
        setInventoryBoard([]); // Thiết lập mảng rỗng nếu dữ liệu không phải mảng
      }
    } catch (error) {
      console.error("Error fetching inventory board:", error);
      setInventoryBoard([]); // Thiết lập mảng rỗng khi gặp lỗi
    }
  };

  // Kiểm tra ngày có hợp lệ không trước khi định dạng
  const isValidDate = selectedDate && !isNaN(Date.parse(selectedDate));

  const formattedDate = isValidDate ? format(new Date(selectedDate), 'dd-MM-yyyy') : '';

  return (
    <div className="my-10">
      <div className="flex items-center p-10">
        <label htmlFor="datePicker" className="mr-2 font-medium">Chọn ngày:</label>
        <input 
          type="date" 
          id="datePicker" 
          value={selectedDate} 
          onChange={(event) => handleDateChange(event)} // Đảm bảo sự kiện onChange truyền đối tượng event
          className="px-4 py-2 border rounded-md"
        />
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-700 my-5">
        BẢNG TỔNG HỢP NGÀY <span className='text-red-600'>{formattedDate}</span>
      </h1>

      <table className="min-w-full bg-white border border-gray-200 table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
            <th className="py-3 px-6 text-left w-20">STT</th>
            <th className="py-3 px-6 text-left">Tên sản phẩm</th>
            <th className="py-3 px-6 text-center">Tồn đầu ngày</th>
            <th className="py-3 px-6 text-center">Nhà cung cấp</th>
            <th className="py-3 px-6 text-center">Thực suất kho</th>
            <th className="py-3 px-6 text-center">Số  lượng hư</th>
            <th className="py-3 px-6 text-center">Tồn cuối ngày</th>
            <th className="py-3 px-6 text-center">Hao hụt</th>
            {/* Các cột khác */}
          </tr>
        </thead>
        <tbody className="text-blue-600 text-sm font-light">
          {inventoryBoards.map((inventoryboard, index) => (
            <tr key={inventoryboard.id} className="border-b border-gray-200 hover:bg-gray-100">
              {/* Cột STT */}
              <td className="py-3 px-6 text-left font-medium">
                {index + 1} {/* Số thứ tự sẽ bắt đầu từ 1 */}
              </td>

              {/* Các cột dữ liệu khác */}
              <td className="py-3 px-6 text-left cursor-pointer">
                <span className="font-medium">{inventoryboard.product}</span>
              </td>

              <td className="py-3 px-6 text-center cursor-pointer">
                <span className="font-medium">{inventoryboard.current_quantity}</span>
              </td>
              <td className="py-3 px-6 text-center cursor-pointer">
                <span className="font-medium">{inventoryboard.import_quantity}</span>
              </td>
              <td className="py-3 px-6 text-center cursor-pointer">
                <span className="font-medium">{inventoryboard.export_quantity}</span>
              </td>
              <td className="py-3 px-6 text-center cursor-pointer">
                <span className="font-medium">{inventoryboard.spoiled_quantity}</span>
              </td>
              <td className="py-3 px-6 text-center cursor-pointer">
                <span className="font-medium">{inventoryboard.final_quantity}</span>
              </td> 
              <td className="py-3 px-6 text-center cursor-pointer">
                <span 
                  className={`font-medium ${inventoryboard.loss_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {inventoryboard.loss_quantity}
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryBoard;
