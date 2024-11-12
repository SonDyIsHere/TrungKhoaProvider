
import axios from 'axios';

// const BASE_URL = 'https://sonduy.pythonanywhere.com';
const BASE_URL = 'http://127.0.0.1:8000/';

export const endpoints = {

    'create_inventory_board': '/inventory_board/create_inventory_board/',
    'get_inventory_board': '/inventory_board/get_inventory_board/',

    'update_inventory': (inv_id, inv_board_id) => `/inventory_board/${inv_board_id}/inventory/${inv_id}/update/`,
   
    'register': '/users/',
    'list_user': '/users/',
    'login': '/o/token/',
    'current_user': '/users/current_user/',

    'patch_user': '/users/current_user/',
    'update_user': (userId) => `/users/${userId}/`,
    'login_google': `/users/google-login/`,

    'delete_user': (id) =>`/users/${id}/`,

};

const APIs = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
  },
});


//Xác thực người dùng 
export const authAPI = (accessToken) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}

export default APIs;
