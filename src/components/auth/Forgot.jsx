import { Link, useNavigate } from "react-router-dom";
import "./forgot.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../dummydata";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [isSucces, setSuccess] = useState(false);
  console.log(email);

  const [messages, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/user/forgot`, {
        email,
      });
      setSuccess(true);
      console.log(res);
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data);
    }
  };

  return (
    <div className="Forgot">
      {!isSucces ? (
        <form action="" onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center" }}>FORGOT PASSWORD</h2>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {messages && (
            <p
              style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
            >
              {messages}
            </p>
          )}
          <button type="submit">Reset</button>
        </form>
      ) : (
        <p style={{ background: "white", padding: "20px", fontSize: "20px" }}>
          Check your email for reset password
        </p>
      )}
    </div>
  );
};

export default Forgot;
