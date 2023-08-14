import { useRef, useState } from "react";
import "./emailVerify.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../dummydata";

// const VerifyOtp = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [respone, setResponse] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   console.log(respone);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "otp") {
//       setOtp(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       await axios
//         .post(`${BASE_URL}/user/auth/verify`, { otp })
//         .then((res) => {
//           console.log(res.data);
//           setResponse(res.data.message);
//           navigate("/login");
//         })
//         .catch((error) => {
//           setError(error.response.data.message);
//           // console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="verify">
//       {respone ? (
//         <p>{respone}</p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           {/* <label htmlFor="">Email</label>
//           <input
//             type="text"
//             placeholder="ReEnter your email..."
//             value={email}
//             name="email"
//             onChange={handleChange}
//           /> */}
//           <label htmlFor="">OTP</label>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             name="otp"
//             onChange={handleChange}
//           />

//           <button type="submit">Submit</button>
//           {error && (
//             <p style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
//               {error}
//             </p>
//           )}
//         </form>
//       )}
//     </div>
//   );
// };

// export default VerifyOtp;

import React from "react";

const VerifyOtp = () => {
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [reseponse, setResponse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputRef = useRef([]);

  //submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpInputs.join("");
    try {
      await axios.post(`${BASE_URL}/user/auth/verify`, { otp });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  //change the input ref
  const handleChange = (e, index) => {
    const { value } = e.target;

    //set otp
    const updateOtpDigits = [...otpInputs];
    updateOtpDigits[index] = value;
    setOtpInputs(updateOtpDigits);

    //move focus to other input
    if (value !== "" && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }

    //move focus left
    if (value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  return (
    <div className="verify">
      <form onSubmit={handleSubmit}>
        <p style={{ alignSelf: "center", fontSize: "20PX" }}>Enter OTP </p>
        <div className="inputs">
          {otpInputs.map((val, i) => (
            <input
              type="text"
              key={i}
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(e, i)}
              ref={(input) => (inputRef.current[i] = input)}
            />
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
