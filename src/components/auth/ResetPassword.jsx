import { Link, useNavigate, useParams } from "react-router-dom";
import "./reset.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../dummydata";

const ResetPassword = () => {
  const params = useParams();
  const token = params.token;
  const tokenEncode = encodeURIComponent(token);
  
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isSucces, setSuccess] = useState(false);

  const [messages, setMessage] = useState("");

  const navigate = useNavigate();

  const hadleChange = async (e) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/user/password/reset/${tokenEncode}`,
        data
      );
      setSuccess(true);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reset">
      <form action="" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>RESET PASSWORD </h2>
        <label htmlFor="">New Password</label>
        <input
          type="text"
          placeholder="password"
          name="password"
          value={data.password}
          onChange={hadleChange}
          required
        />
        <label htmlFor="">Confirm Password</label>
        <input
          type="text"
          placeholder="confirm password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={hadleChange}
          required
        />

        {messages && (
          <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
            {messages}
          </p>
        )}
        <button type="submit">Update </button>
      </form>
    </div>
  );
};

export default ResetPassword;
