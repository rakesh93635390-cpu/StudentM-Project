import Addstudent from "./Pages/Addstudent";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Myprofile from "./Pages/Myprofile";
import Edite from "./Pages/Edite";
import ChangePW from "./Pages/ChangePW";
import SignIn from "./Pages/SignIn";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}>
        </Route>
          <Route path="/SignIn" element={<SignIn/>}>
        </Route>

        <Route path="/home" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }></Route>
        <Route path="/Addstudent" element={<Addstudent/>}></Route>
        <Route path="/Myprofile" element={<Myprofile/>}></Route>
        <Route path="/Edite/:id" element={<Edite/>}></Route>
        <Route path="/ChangePW" element={<ChangePW/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;