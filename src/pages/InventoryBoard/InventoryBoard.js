import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIs, { endpoints } from '../../configs/APIs';
import { format } from 'date-fns'; 
import { BiPencil, BiTrash, BiDotsHorizontalRounded, BiDetail, BiHide } from 'react-icons/bi';

const InventoryBoard = () => {
  const [inventoryBoards, setInventoryBoard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleInputChange = (index, field, value) => {
    setInventoryBoard(prevState =>
      prevState.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
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

  const handleSelectChange = async (boardDate) => {
    try {
      const response = await APIs.get(`${endpoints['get_inventory_board']}${boardDate}/`);
      const data = response.data;
      if (Array.isArray(data)) {
        setInventoryBoard(data);
      } else {
        console.error("Received data is not an array", data);
        setInventoryBoard([]);
      }
    } catch (error) {
      console.error("Error fetching inventory board:", error);
      setInventoryBoard([]);
    }
  };

  const handleSaveChanges = async () => {
    try {
      for (const inventory of inventoryBoards) {
        // Call API with correct endpoint structure using inventory board and inventory IDs
        await APIs.patch(
          endpoints['update_inventory'](inventoryBoards.id, inventory.id), // Pass `inv_id` as inventory.id and `inv_board_id` as inventoryBoards.id
          inventory
        );
      }
      setIsEditing(false); // Exit editing mode
      alert('Changes saved successfully');
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };
  

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
          onChange={(event) => handleDateChange(event)} 
          className="px-4 py-2 border rounded-md"
        />
      </div>

      <h1 className="text-3xl font-bold text-center text-gray-700 my-5">
        BẢNG TỔNG HỢP NGÀY <span className='text-red-600'>{formattedDate}</span>
      </h1>

      <div className="flex justify-end mt-4 space-x-2">
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isEditing ? "Lưu" : "Sửa"}
        </button>
        {isEditing && (
          <button 
            onClick={handleSaveChanges} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Lưu thay đổi
          </button>
        )}
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
          </tr>
        </thead>
        <tbody className="text-blue-600 text-sm font-medium">
          {inventoryBoards.map((inventoryboard, index) => (
            <tr key={inventoryboard.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left font-medium">{index + 1}</td>

              <td className="py-3 px-6 text-left">
                {inventoryboard.product}
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing ? (
                  <input
                    type="number"
                    value={inventoryboard.current_quantity}
                    onChange={(e) => handleInputChange(index, 'current_quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-12"
                  />
                ) : (
                  <span>{inventoryboard.current_quantity}</span>
                )}
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing ? (
                  <input
                    type="number"
                    value={inventoryboard.import_quantity}
                    onChange={(e) => handleInputChange(index, 'import_quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-12"
                  />
                ) : (
                  <span>{inventoryboard.import_quantity}</span>
                )}
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing ? (
                  <input
                    type="number"
                    value={inventoryboard.export_quantity}
                    onChange={(e) => handleInputChange(index, 'export_quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-12"
                  />
                ) : (
                  <span>{inventoryboard.export_quantity}</span>
                )}
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing ? (
                  <input
                    type="number"
                    value={inventoryboard.spoiled_quantity}
                    onChange={(e) => handleInputChange(index, 'spoiled_quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-12"
                  />
                ) : (
                  <span>{inventoryboard.spoiled_quantity}</span>
                )}
              </td>

              <td className="py-3 px-6 text-center">
                {isEditing ? (
                  <input
                    type="number"
                    value={inventoryboard.final_quantity}
                    onChange={(e) => handleInputChange(index, 'final_quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-12"
                  />
                ) : (
                  <span>{inventoryboard.final_quantity}</span>
                )}
              </td>

              <td className="py-3 px-6 text-center">
                <span 
                  className={`font-medium ${
                    inventoryboard.loss_quantity > 0 
                      ? 'text-green-600' 
                      : inventoryboard.loss_quantity < 0 
                        ? 'text-red-600' 
                        : 'text-blue-600'
                  }`}
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
