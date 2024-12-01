// import React, { useContext, useState} from 'react';
// import { Link,  useNavigate} from 'react-router-dom';
// import { GoogleLogin } from '@react-oauth/google';
// import { MyDispatchContext } from '../../configs/Context';
// import APIs, { authAPI, endpoints } from '../../configs/APIs';
// // import {setToken} from '../../utils/storage'
// import bg_login from '../../assets/bg-login.jpg'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Loading from '../../component/Loading';
// import LoginGG from './LoginGoogle';


// // import { getAuth, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
// // import { app } from '../../firebase/config'; // assuming your Firebase config is initialized here

// // Initialize Firebase Authentication
// const auth = getAuth(app);  // Get the auth instance from the app

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [user, setUser] = useState({});
//   const nav = useNavigate();
//   const dispatch = useContext(MyDispatchContext);
//   const [fb, setFb] = useState("");
//   const [account, setAccount] = useState("")

//   // const token = getToken();
//   // console.log(token);

//   const [loading, setLoading] = useState(false);

//   const fbProvider = new FacebookAuthProvider();

//   const handleFbLogin = () => {
//     // Use signInWithPopup to initiate the Facebook login
//     signInWithPopup(auth, fbProvider)
//       .then((result) => {
//         // Handle successful login
//         console.log("User logged in:", result.user);
//         nav("/")
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error during Facebook login:", error);
//       });
// };



//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     alert('Đăng nhập thành công');
    
//   };


//   const fields = [
//     { label: "Username", icon: "email", field: "username" },
//     { label: "Password", icon: "lock", field: "password", secureTextEntry: true },
//   ];


//   const change = (value, field) => {
//     setUser((current) => {
//       return { ...current, [field]: value };
//     });
//   };
//   const login = async () => {
//     setLoading(true);
//     // console.log("Client ID: ", Config.process.env.CLIENT_ID); // Kiểm tra giá trị
//     // console.log("Client Secret: ", Config.process.env.CLIENT_SECRET); // Kiểm tra giá trị
//     try {
//       let res = await APIs.post(endpoints["login"], {
//         ...user,
//         // "client_id": CLIENT_ID,
//         // "client_secret": CLIENT_SECRET,
//         "client_id": "enHpnR3XUKQu18EhycmMESDZrtaJXLjGWdwOAnnH",
//         "client_secret": "PgSEdKOQzkd2CGybulxckACGibcDbi5EcBs1eCrOYXrquwoU81HrN9MuLoW7XPSDgoNFmGssxAS6liZd5orPePPhgEu3wgYLAhxxqnyhwekxbmGkOIbljj5hs4Qm6rOd",
//         "grant_type": "password",
//       });

//       // Lưu token vào localStorage bằng hàm setToken
//       setToken(res.data.access_token);
      
//       setTimeout(async () => {
//         let user = await authAPI(res.data.access_token).get(endpoints['current_user']);
//         console.info(user.data);
//         dispatch({ type: 'login', payload: user.data });

//         nav('/');
//       }, 3000);

//       // Hiển thị thông báo thành công
//       toast.success('Login successful!', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         style: {
//           marginTop: '70px', // Điều chỉnh khoảng cách để tránh header
//         },
//       });
//     } catch (ex) {
//       alert(
//         'Error',
//         'Incorrect username or password. Please try again. !!',
//         [
//           {
//             text: 'Exit',
//             style: 'cancel',
//           },
//         ],
//         { cancelable: false }
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

  
//   return (
//     <div>
//         <div className="flex justify-center items-center h-screen"> 
//         <img src={bg_login} className="absolute inset-0 w-full h-[700px] object-cover z-0"></img>
//         <form className="relative z-10 bg-slate-300 my-5 p-8 rounded shadow-md w-80" onSubmit={handleSubmit}>
//           <h2 className="text-2xl font-bold mb-4 text-center">SIGN IN</h2>
//           <div className="mb-4">
//             {fields.map((f) => (
//             <div key={f.field} className="mb-5">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={f.field}>{f.label}</label>
//               <input
//                 type={f.secureTextEntry ? "password" : "text"}
//                 id={f.field}
//                 className="w-full px-3 py-2 border rounded"
//                 value={user[f.field] || ""} // Thêm || "" để tránh hiển thị undefined khi giá trị chưa được định nghĩa
//                 onChange={(event) => change(event.target.value, f.field)} // Chỉ truyền giá trị event.target.value
//                 required
//               />
//             </div>
//           ))}
            
//           </div>
//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//           <button
//             type="submit"
//             className="w-full bg-teal-700 text-white py-2 rounded hover:bg-teal-900"
//             onClick={login}
//             disabled={loading}
//           >
//             {loading ? 'Loading...' : 'Sign in'}
//           </button>
//           <ToastContainer />
//           <div className="mt-4 text-center">
//             <span className="text-sm">Don't have an account?</span>{' '}
//             <Link to="/register" className="text-blue-950 underline">
//             Sign Up
//             </Link>
//           </div>
//           <div className="flex items-center mt-4">
//             <div className="flex-grow h-px bg-gray-400"></div>
//             <span className="flex-shrink text-sm text-gray-500 px-4">OR</span>
//             <div className="flex-grow h-px bg-gray-400"></div>
//           </div>
//             <LoginGG/>
//             <button
//                 className="flex items-center justify-center mt-4 p-2 border rounded bg-white shadow hover:bg-gray-100 w-full"
//                 onClick={handleFbLogin}
                
//             >
//                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-5 h-5 mr-2" />
//                 Continue with Facebook
//             </button>
          
          
//         </form>
//       </div>
//     </div>
//   );
    

// };

// export default Login;