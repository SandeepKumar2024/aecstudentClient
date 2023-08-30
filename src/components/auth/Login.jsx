import { Link, useNavigate, useParams } from "react-router-dom";
import "./login.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../reducers/userReducers/authSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [messages, setMessage] = useState("");

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  const user = useSelector((state) => state.auth.user);
  const userName = user?.name || "";
  const isSuccess = useSelector((state) => state.auth.isSuccess);
  const isError = useSelector((state) => state.auth.isError);
  const message = useSelector((state) => state.auth.message);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = user?.user?.isAdmin;

  //admin check
 

  const { email, password } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    console.log(data);
  };

  //failed count
  // const [failedCount,setFailedCount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    
    setMessage(message);

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && !isAdmin) {
      navigate("/");
    } else if (isSuccess && isAdmin) {
      navigate("/adminDash");
    }
    dispatch(reset());
  }, [userName, isSuccess, navigate, dispatch, isAdmin]);

  return (
    <div className="login">
      <form action="" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>LOGIN</h2>
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="****"
          value={data.password}
          name="password"
          onChange={handleChange}
          required
        />
        {messages && (
          <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
            {messages}
          </p>
        )}
        <button type="submit">Login</button>
        <Link className="link" to="/forgot" style={{ textDecoration: "none", color: "inherit" }}>
          <span className="forgot">Forgot password</span>
        </Link>
        <p style={{ textAlign: "center" }}>
          Don't have an Account ? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
