
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {MyDispatchContext , MyUserContext} from './configs/Context';
import MyUserReducer from './configs/Reducers';
import {useReducer } from 'react';
import './index.css'; 
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from './pages/Home';
import LoadingLayout from './components/Loading/LoadingLayout';
import Attendance from './pages/Attendance/Attendance'
import Convertion from './pages/Convertion/Convertion'
import InventoryBoard from './pages/InventoryBoard/InventoryBoard'


function MyTab() {
  return (
    <Router>
      
        <div>
          <Header />
          <main className="flex-grow mt-16">
            <Routes>
              <Route element={<LoadingLayout/>}>
                {/* <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} /> */}
                

                

                <Route path="/" element={<Home />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/convertion" element={<Convertion />} />
                <Route path="/inventory-board" element={<InventoryBoard />} />
                <Route path="*" element={() => <div>404 Not Found</div>} />
              </Route>
              
            </Routes>
          </main>
          <Footer />
        </div>
    </Router>
  );
}

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (

    
      <MyUserContext.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
            <MyTab />
        </MyDispatchContext.Provider>
      </MyUserContext.Provider>
  );
};

export default App;