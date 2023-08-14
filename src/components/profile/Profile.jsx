import { useParams } from "react-router-dom";
import "./profile.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../dummydata";

const Profile = () => {
  const [stdData, setStdData] = useState([]);

  const id = useParams().id;
  console.log(stdData.img);

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await axios.get(`${BASE_URL}/user/get/${id}`);
      setStdData(res.data);
    };
    fetchStudent();
  }, [id]);

  return (
    <div className="profile">
      <div className="container">
        <div className="back">
          <i
            onClick={() => window.history.back()}
            class="fa-solid fa-arrow-left"
          ></i>
        </div>
        <div className="left">
          <img
            src={
              stdData.img
                ? `${BASE_URL}/${stdData.img}`
                : `https://img.freepik.com/free-photo/fashion-boy-with-yellow-jacket-blue-pants_71767-96.jpg?size=626&ext=jpg`
            }
            alt=""
          />
          <div className="icon">
            <i class="fa-solid fa-envelope"></i>
            <span>{stdData.email}</span>
          </div>
          <div className="icon">
            <i class="fa-solid fa-phone"></i>
            <span>{stdData.phoneNumber}</span>
          </div>
        </div>
        <div className="right">
          <div className="infoCont">
            <div className="info">
              <span>Name:</span>
              <span>{stdData.name}</span>
            </div>
            <div className="info">
              <span>Address:</span>
              <span>{stdData.address}</span>
            </div>
            <div className="info">
              <span>Department:</span>
              <span>{stdData.department}</span>
            </div>
            <div className="info">
              <span>Batch:</span>
              <span>{stdData.batch}</span>
            </div>
            <div className="info">
              <span>Current Sem:</span>
              <span>{stdData.currentSemester}</span>
            </div>
            <div className="info">
              <span>Parent Name:</span>
              <span>{stdData.parentName}</span>
            </div>
            <div className="info">
              <span>Parent Contact:</span>
              <span>{stdData.parentContact}</span>
            </div>
            <div className="info">
              <span>Job:</span>
              <span>{stdData.job}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
