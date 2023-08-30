import { useState } from "react";
import "./register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../dummydata";

const Register = () => {
  const [isError, setError] = useState(" ");

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  console.log(input);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  //verify email

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${BASE_URL}/user/register`,  input )
        .then((res) => navigate("/verifyEmail"))
        .catch((err) => setError(err.response.data.message));
    } catch (error) {
      console.log(error);

      
    }
  };

  return (
    <div className="register">
      <form action="" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>REGISTER</h2>
        <label htmlFor="">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          value={input.email}
          onChange={handleChange}
        />
        <label htmlFor="">Password</label>
        <input
          type="text"
          placeholder="****"
          name="password"
          value={input.password}
          onChange={handleChange}
        />
        {/* <input
          type="file"
          placeholder="Upload image"
          name="img"
          value={input.img}
          onChange={handleChange}
        /> */}
        <button type="submit">Register</button>
        {isError && (
          <p style={{ color: "red", textAlign: "center", fontSize: "18px" }}>
            {isError}
          </p>
        )}
        <p style={{ textAlign: "center" }}>
          Already have an Account ? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
