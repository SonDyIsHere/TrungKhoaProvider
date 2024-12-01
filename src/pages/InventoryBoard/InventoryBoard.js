import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIs, { endpoints } from '../../configs/APIs';
import { format } from 'date-fns'; 
import { BiPencil, BiTrash, BiDotsHorizontalRounded, BiDetail, BiHide } from 'react-icons/bi';
import { FaPencil } from 'react-icons/fa6';

const InventoryBoard = () => {
  const [inventoryBoards, setInventoryBoard] = useState({});
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleInputChange = (id, field, value) => {
    setInventoryBoard((prevState) => {
      if (Array.isArray(prevState.inventory)) {
        const updatedInventory = prevState.inventory.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        );
        return {
          ...prevState,
          inventory: updatedInventory,
        };
      }
      return prevState;
    });
  };
  
  
  
  


  const isValidDate = selectedDate && !isNaN(Date.parse(selectedDate));
  const formattedDate = isValidDate ? format(new Date(selectedDate), 'dd-MM-yyyy') : '';

  const handleSelectChange = async (boardDate) => {
    try {
      const response = await APIs.get(`${endpoints['get_inventory_board']}detail/${boardDate}/`);
      const data = response.data;
      setInventoryBoard(data);  
      console.log(data)
    } catch (error) {
      console.error("Error fetching inventory board:", error);
      setInventoryBoard({});
    }
  };

  const handleDateChange = async (event) => {
    if (!event || !event.target) {
      console.error("Event or event.target is undefined");
      return;
    }

    const selectedDate = event.target.value;
    setSelectedDate(selectedDate); 
    handleSelectChange(selectedDate);
  };

  
  const handleSaveChanges = async (id) => {
    try {
      const inventory = inventoryBoards.inventory.find((item) => item.id === id);

      // Gọi API để lưu thay đổi
      await APIs.patch(
        `${endpoints['update_inventory']}${inventoryBoards.id}/inventory/${inventory.id}/update/`,
        inventory
      );

      setIsEditing(null); // Thoát chế độ chỉnh sửa
      alert('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };
  
  
  
  



  return (
    <div className="my-10">
      <div className="flex items-center p-10">
        <label htmlFor="datePicker" className="mr-2 font-medium">Chọn ngày:</label>
        <input 
          type="date" 
          id="datePicker" 
          value={selectedDate} 
          onChange={(event) => handleDateChange(event)} 
          className="px-4 py-2 border rounded-md"
        />
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-700 my-5">
        BẢNG TỔNG HỢP NGÀY <span className='text-red-600'>{formattedDate}</span>
      </h1>

      <div className="flex justify-end mt-4 space-x-2">
        <button 
         onClick={() => isEditing ? handleSaveChanges() : setIsEditing(true)} 
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isEditing ? "Lưu" : "Sửa"
          }
        </button>
        
      </div>

      <table className="min-w-full my-2 bg-white border border-gray-200 table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left w-20">STT</th>
            <th className="py-3 px-6 text-left">Tên sản phẩm</th>
            <th className="py-3 px-6 text-center">Tồn đầu ngày</th>
            <th className="py-3 px-6 text-center">Nhà cung cấp</th>
            <th className="py-3 px-6 text-center">Thực suất kho</th>
            <th className="py-3 px-6 text-center">Số lượng hư</th>
            <th className="py-3 px-6 text-center text-red-600">Tồn cuối ngày</th>
            <th className="py-3 px-6 text-center">Hao hụt</th>
            <th className="py-3 px-6 text-center"></th>
          </tr>
        </thead>
        <tbody className="text-blue-600 text-sm font-medium">
        {inventoryBoards.inventory?.map((inventory, index) => (
            <tr key={inventory.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left font-medium">{index + 1}</td>

              <td className="py-3 px-6 text-left">
                {inventory.product}
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing === inventory.id ? (
                  <input
                    type="number"
                    value={inventory.current_quantity}
                    onChange={(e) => handleInputChange(inventory.id, 'current_quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-12"
                  />
                ) : (
                  <span>{inventory.current_quantity}</span>
                )}
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing === inventory.id ? (
                  <input
                    type="number"
                    value={inventory.import_quantity}
                    onChange={(e) => handleInputChange(inventory.id, 'import_quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-12"
                  />
                ) : (
                  <span>{inventory.import_quantity}</span>
                )}
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing === inventory.id ? (
                  <input
                    type="number"
                    value={inventory.export_quantity}
                    onChange={(e) => handleInputChange(inventory.id, 'export_quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-12"
                  />
                ) : (
                  <span>{inventory.export_quantity}</span>
                )}
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing === inventory.id ? (
                  <input
                    type="number"
                    value={inventory.spoiled_quantity}
                    onChange={(e) => handleInputChange(inventory.id, 'spoiled_quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-12"
                  />
                ) : (
                  <span>{inventory.spoiled_quantity}</span>
                )}
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing === inventory.id ? (
                  <input
                    type="number"
                    value={inventory.final_quantity}
                    onChange={(e) => handleInputChange(inventory.id, 'final_quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-12"
                  />
                ) : (
                  <span>{inventory.final_quantity}</span>
                )}
              </td>

              <td className="py-3 px-6 text-center">
                <span
                  className={`font-medium ${
                    inventory.loss_quantity > 0
                      ? 'text-green-600'
                      : inventory.loss_quantity < 0
                      ? 'text-red-600'
                      : 'text-blue-600'
                  }`}
                >
                  {inventory.loss_quantity}
                </span>
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing === inventory.id ? (
                  <button
                    onClick={() => handleSaveChanges(inventory.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Save
                  </button>
                ) : (
                  <BiPencil
                    className="cursor-pointer text-gray-600 hover:text-blue-500"
                    onClick={() => setIsEditing(inventory.id)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryBoard;
