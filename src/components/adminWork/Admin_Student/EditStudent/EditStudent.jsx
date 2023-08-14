import { useEffect, useState } from "react";
import "./editStudent.scss";
import axios from "axios";
import { useParams, use } from "react-router-dom";
import { BASE_URL } from "../../../../dummydata";

const EditStudent = () => {
  const { id } = useParams();
  const [intialData, setIntialData] = useState({});
  const [modifiedData, setModilfiedData] = useState({});
  const [message, setMessage] = useState(" ");
  //get token
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const token = user.token;

  //go back
  const [image, setImage] = useState(null);

  //set form data
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phoneNumber: "",
    dob: "",
    course: "",
    batch: "",
    department: "",
    gpa: "",
    attendedance: "",
    currentSemester: "",
    job: "",
    parentName: "",
    parentContact: "",
    address: "",
    img: null,
  });

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await axios.get(`${BASE_URL}/user/get/${id}`);
      setIntialData(res.data);
    };

    fetchStudent();
  }, [id]);

  //update the value of input

  useEffect(() => {
    setFormData({
      name: intialData.name || "",
      age: intialData.age || "",
      gender: intialData.gender || "",
      dob: intialData.dob || "",
      phoneNumber: intialData.phoneNumber || "",
      course: intialData.course || "",
      batch: intialData.batch || "",
      department: intialData.department || "",
      gpa: intialData.gpa || "",
      currentSemester: intialData.currentSemester || "",
      job: intialData.job || "",
      parentContact: intialData.parentContact || "",
      parentName: intialData.parentName || "",
      attendedance: intialData.attendedance || "",
      address: intialData.address || "",
      img: intialData.img || null,
    });
  }, [intialData]);

  console.log(formData.img);

  //on update on modified fields
  useEffect(() => {
    const modifiedObject = Object.keys(formData).filter(
      (key) => formData[key] !== intialData[key]
    );

    const modifiedObjects = {};

    modifiedObject.forEach((key) => {
      modifiedObjects[key] = formData[key];
    });

    setModilfiedData(modifiedObjects);
  }, [formData, intialData]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const selectDate = new Date(value);
      const formatDate = selectDate.toISOString().slice(0, 10);
      setFormData({
        ...formData,
        [name]: formatDate,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //submit the button
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${BASE_URL}/user/update/student/${id}`,
        modifiedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data);
      window.location.reload();
    } catch (error) {
      setMessage(error.message);
    }
  };

  //image upload
  const handleImageChange = async (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (!image) return;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", image);
    try {
      const res = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editStd">
      <button className="back" onClick={() => window.history.back()}>
        Back
      </button>
      <form action="" onSubmit={handleSubmit}>
        <h2>Personal Information</h2>

        <div className="personalInfo">
          <div className="perLeft">
            <div className="inputPerson">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                value={formData.name}
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="inputPerson gender">
              <label htmlFor="">Gender</label>
              <div className="genderCont">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="others"
                  name="gender"
                  value="others"
                  checked={formData.gender === "others"}
                  onChange={handleChange}
                />
                <label htmlFor="male">Others</label>
              </div>
            </div>
            <div className="inputPerson">
              <label htmlFor="">Age</label>
              <input
                type="number"
                placeholder="name"
                name="age"
                value={formData.age}
                id="age"
                onChange={handleChange}
              />
            </div>
            <div className="inputPerson">
              <label htmlFor="">Phone No</label>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                id="phoneNumber"
                onChange={handleChange}
              />
            </div>
            <div className="inputPerson">
              <label htmlFor="">DOB</label>
              <input
                type="date"
                placeholder="name"
                name="dob"
                value={formData.dob}
                id="dob"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="perRight">
            {formData.img ? (
              <>
                <img src={`${BASE_URL}/${formData.img}`} alt="" />
                <button className="editBtn">
                  {" "}
                  <input
                    type="file"
                    accept="/image"
                    onChange={handleImageChange}
                  />
                </button>
              </>
            ) : (
              <div className="circle">
                <input
                  type="file"
                  accept="/image"
                  onChange={handleImageChange}
                />
              </div>
            )}
            <button onClick={handleImageSubmit}>Upload</button>
          </div>
        </div>

        {/* Education info */}
        <h2>Education Information</h2>
        <div className="inpuLabel">
          <label htmlFor="">Course</label>
          <input
            type="text"
            placeholder="name"
            name="course"
            value={formData.course}
            id="course"
            onChange={handleChange}
          />
        </div>
        <div className="inpuLabel">
          <label htmlFor="">Batch</label>
          <input
            type="text"
            placeholder="name"
            name="batch"
            value={formData.batch}
            id="batch"
            onChange={handleChange}
          />
        </div>
        <div className="inpuLabel">
          <label htmlFor="">Department</label>
          <input
            type="text"
            placeholder="name"
            name="department"
            value={formData.department}
            id="department"
            onChange={handleChange}
          />
        </div>
        <div className="inpuLabel">
          <label htmlFor="">GPA</label>
          <input
            type="number"
            placeholder="name"
            name="gpa"
            value={formData.gpa}
            id="gpa"
            onChange={handleChange}
          />
        </div>
        {/* <div className="inpuLabel">
          <label htmlFor="">Attendence</label>
          <input
            type="number"
            placeholder="Attendence"
            name="attendedance"
            value={formData.attendedance}
            id="attendedance"
            onChange={handleChange}
          />
        </div> */}
        <div className="inpuLabel">
          <label htmlFor="">CurrSemester</label>
          <input
            type="number"
            placeholder="semester"
            name="currentSemester"
            value={formData.currentSemester}
            id="currentSemester"
            onChange={handleChange}
          />
        </div>

        <div className="inpuLabel">
          <label htmlFor="">Job</label>
          <input
            type="text"
            placeholder="name"
            name="job"
            value={formData.job}
            id="job"
            onChange={handleChange}
          />
        </div>

        {/* Parent info */}
        <h2>Parent Information</h2>

        <div className="inpuLabel">
          <label htmlFor="">Parent Name</label>
          <input
            type="text"
            placeholder="name"
            name="parentName"
            value={formData.parentName}
            id="parentName"
            onChange={handleChange}
          />
        </div>

        <div className="inpuLabel">
          <label htmlFor="">Parent Contact</label>
          <input
            type="number"
            placeholder="name"
            name="parentContact"
            value={formData.parentContact}
            id="parentContact"
            onChange={handleChange}
          />
        </div>
        <div className="inpuLabel">
          <label htmlFor="">Address</label>
          <textarea
            type="text"
            placeholder="name"
            name="address"
            value={formData.address}
            id="address"
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditStudent;
