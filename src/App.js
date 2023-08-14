import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import VerifyEmail from "./components/emailVerify/VerifyEmail";
import VerifyOtp from "./components/emailVerify/VerifyOtp";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import StudentDir from "./components/studentDir/StudentDir";
import Profile from "./components/profile/Profile";
import CreateStudent from "./components/adminWork/createStudent/CreateStudent";
import { store } from "./reducers/userReducers/store";
import { Provider } from "react-redux";
import Home from "./pages/Home";
import Admin from "./components/adminWork/adminApp/Admin";
import EditStudent from "./components/adminWork/Admin_Student/EditStudent/EditStudent";
import Forgot from "./components/auth/Forgot";
import ResetPassword from "./components/auth/ResetPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
  {
    path: "/verifyOtp",
    element: <VerifyOtp />,
  },
  {
    path: "/create",
    element: <CreateStudent />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/viewProfile/:id",
    element: <Profile />,
  },
  {
    path: "/students",
    element: <StudentDir />,
  },
  {
    path:"/adminDash",
    element:<Admin/>
  },
  {
    path:"/forgot",
    element:<Forgot/>
  },
  {
    path:"/user/password/reset/:token",
    element:<ResetPassword/>
  },
  {
    path:"/editStd/:id",
    element:<EditStudent/>
  }
]);

const App = () => {
  return (
    <Provider store={store}>
      <div className="app" style={{width:"99vw",margin:"0px",padding:"0px"}}>
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
};

export default App;
