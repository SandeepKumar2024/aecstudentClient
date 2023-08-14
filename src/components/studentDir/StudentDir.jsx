import { useEffect, useState } from "react";
import ProfileCard from "../studentProfileCard/ProfileCard";
import "./studentDir.scss";
import axios from "axios";
import { BASE_URL } from "../../dummydata";

const sizeOfPage = 5;



const StudentDir = () => {
  const [openBars, setOpenBars] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [data, setData] = useState({});
  const [selectedBrances, setBranches] = useState([]);
  const [selectedSem, setSemseter] = useState([]);
  const [selectedEnrollYear, setEnrollYear] = useState([]);
  //filter search data
  const [filterData, setFilterData] = useState([]);
  const [searchData, setSearchData] = useState([]);



  const filtData = (data, selectedBrances, selectedEnrollYear, selectedSem) => {
    const filteredData = data.students.filter((student) => {
      const hasBranch = selectedBrances.length === 0 || selectedBrances.includes(student.course);
      const hasEnrollYear = selectedEnrollYear.length === 0 || selectedEnrollYear.includes(student.enrollYear);
      const hasSem = selectedSem.length === 0 || selectedSem.includes(student.currentSemester);
  
      return hasBranch && hasEnrollYear && hasSem;
    });
    
  
    return filteredData;
  };


  //get the index of current page
  const stuData = Object.values(data);
  
  const totalDataCount = Array.isArray(stuData[1])? stuData[1].length :0;
  const startIndex = Math.min((currentPage - 1) * sizeOfPage, totalDataCount);
  const endIndex = Math.min(startIndex + sizeOfPage, totalDataCount);

  //handle page no
  const handlePage = (pageNo) => {
    setPage(pageNo);
  };

  // const showResults = searchData.length > 0 ? searchData : filterData;
  const showResults = Array.isArray(stuData[1]) ? stuData[1].slice(startIndex, endIndex) : [];

  //fetch data from database

  const [searchValue, setValue] = useState(" ");

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`${BASE_URL}?name=${searchValue}`);
    setData(res.data);
    console.log(searchValue);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(`${base_url}?name=${searchValue}`);
  //     setData(res.data);
  //   };

  //   fetchData();
  // }, [searchValue]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${BASE_URL}?name=${searchValue}`);
      const allData = res.data;
      console.log(allData)
      const filteredData = filtData(
        allData|| [], // Pass the array containing the student data here
        selectedBrances,
        selectedEnrollYear,
        selectedSem
      );
      console.log(filteredData);

      setData({ ...allData, students: filteredData });
    };

    fetchData();
  }, [searchValue, selectedBrances, selectedEnrollYear, selectedSem]);

  // ... (rest of the code remains the same)


  //FILTER BRANCH WISE
  const handleBranchChange = (e) => {
    const branch = e.target.value;
    if (e.target.checked) {
      setBranches((prev) => [...prev, branch]);
    } else {
      setBranches((prev) =>
        prev.filter((selectBranch) => selectBranch !== branch)
      );
    }
  };
  //FILTER ENROLL YEAR WISE
  const handleEnrollYearChange = (e) => {
    const year = e.target.value;
    if (e.target.checked) {
      setEnrollYear((prev) => [...prev, year]);
    } else {
      setEnrollYear((prev) => prev.filter((seleYear) => seleYear !== year));
    }
  };
  //FILTER ENROLL YEAR WISE
  const handleSemChange = (e) => {
    const sem = e.target.value;
    if (e.target.checked) {
      setSemseter((prev) => [...prev, sem]);
    } else {
      setSemseter((prev) => prev.filter((selectSem) => selectSem !== sem));
    }
  };

  //using useeffect

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${BASE_URL}?course=${selectedBrances.join(
          "&course="
        )}&enrollYear=${selectedEnrollYear.join(
          "&enrollYear="
        )}&currentSemester=${selectedSem.join("&currentSemester=")}`
      );
      setData(res.data);
    };

    fetchData();
  }, [selectedEnrollYear, selectedBrances, selectedSem]);

  // console.log(data);
  return (
    <div className="dashboard">
      <div className="title">
        <h1>AEC Student Directory</h1>
      </div>
      <button className="back" onClick={() => window.history.back()}>
        <i class="fa-solid fa-arrow-left"></i>
      </button>

      <div className="wrapper">
        {
          <div className="more">
            {openBars ? (
              <i
                onClick={() => setOpenBars(false)}
                class="fa-solid fa-xmark"
              ></i>
            ) : (
              <i
                style={{ fontSize: "30px", color: "blue" }}
                onClick={() => setOpenBars(true)}
                class="fa-solid fa-arrow-up-short-wide"
              ></i>
            )}

            {openBars && (
              <div className="left">
                <p className="title">FILTERS</p>
                <div className="leftPadding">
                  <div className="leftCont">
                    <div className="lContent">
                      <p>BRANCH</p>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="CSE"
                          onChange={handleBranchChange}
                          checked={selectedBrances.includes("CSE")}
                        />
                        <label htmlFor="">CSE</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="MECH"
                          onChange={handleBranchChange}
                          checked={selectedBrances.includes("MECH")}
                        />
                        <label htmlFor="">MECH</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="CIVIL"
                          onChange={handleBranchChange}
                          checked={selectedBrances.includes("CIVIL")}
                        />
                        <label htmlFor="">CIVIL</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="ETE"
                          onChange={handleBranchChange}
                          checked={selectedBrances.includes("ETE")}
                        />
                        <label htmlFor="">ETE</label>
                      </div>
                    </div>
                    <div className="lContent">
                      <p>ENROLLED YEAR</p>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="2019"
                          onChange={handleEnrollYearChange}
                          checked={selectedEnrollYear.includes("2019")}
                        />
                        <label htmlFor="">2019</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="2020"
                          onChange={handleEnrollYearChange}
                          checked={selectedEnrollYear.includes("2020")}
                        />
                        <label htmlFor="">2020</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="2021"
                          onChange={handleEnrollYearChange}
                          checked={selectedEnrollYear.includes("2021")}
                        />
                        <label htmlFor="">2021</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="2022"
                          onChange={handleEnrollYearChange}
                          checked={selectedEnrollYear.includes("2022")}
                        />
                        <label htmlFor="">2022</label>
                      </div>
                    </div>
                    <div className="lContent">
                      <p>CURRENT SEM</p>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="1"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("1")}
                        />
                        <label htmlFor="">1 Sem</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="2"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("2")}
                        />
                        <label htmlFor="">2 Sem</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="3"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("3")}
                        />
                        <label htmlFor="">3 Sem</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="4"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("4")}
                        />
                        <label htmlFor="">4 Sem</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="5"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("5")}
                        />
                        <label htmlFor="">5 Sem</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="6"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("6")}
                        />
                        <label htmlFor="">6 Sem</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="7"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("7")}
                        />
                        <label htmlFor="">7 Sem</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        }

        <div className="searchCont">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by name...."
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>

      <div className="leftForPc">
                <p className="title">FILTERS</p>
                <div className="leftPadding">
                  <div className="leftCont">
                    <div className="lContent">
                      <p>BRANCH</p>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="CSE"
                          onChange={handleBranchChange}
                          checked={selectedBrances.includes("CSE")}
                        />
                        <label htmlFor="">CSE</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="MECH"
                          onChange={handleBranchChange}
                          checked={selectedBrances.includes("MECH")}
                        />
                        <label htmlFor="">MECH</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="CIVIL"
                          onChange={handleBranchChange}
                          checked={selectedBrances.includes("CIVIL")}
                        />
                        <label htmlFor="">CIVIL</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="ETE"
                          onChange={handleBranchChange}
                          checked={selectedBrances.includes("ETE")}
                        />
                        <label htmlFor="">ETE</label>
                      </div>
                    </div>
                    <div className="lContent">
                      <p>ENROLLED YEAR</p>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="2019"
                          onChange={handleEnrollYearChange}
                          checked={selectedEnrollYear.includes("2019")}
                        />
                        <label htmlFor="">2019</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="2020"
                          onChange={handleEnrollYearChange}
                          checked={selectedEnrollYear.includes("2020")}
                        />
                        <label htmlFor="">2020</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="2021"
                          onChange={handleEnrollYearChange}
                          checked={selectedEnrollYear.includes("2021")}
                        />
                        <label htmlFor="">2021</label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="2022"
                          onChange={handleEnrollYearChange}
                          checked={selectedEnrollYear.includes("2022")}
                        />
                        <label htmlFor="">2022</label>
                      </div>
                    </div>
                    <div className="lContent">
                      <p>CURRENT SEM</p>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="1"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("1")}
                        />
                        <label htmlFor="">1 </label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="2"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("2")}
                        />
                        <label htmlFor="">2 </label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="3"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("3")}
                        />
                        <label htmlFor="">3 </label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="4"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("4")}
                        />
                        <label htmlFor="">4 </label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="5"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("5")}
                        />
                        <label htmlFor="">5 </label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="6"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("6")}
                        />
                        <label htmlFor="">6 </label>
                      </div>
                      <div className="checkCont">
                        <input
                          type="checkbox"
                          value="7"
                          onChange={handleSemChange}
                          checked={selectedSem.includes("7")}
                        />
                        <label htmlFor="">7 </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


      {!openBars && (
        <div className="right">
          <div className="results">
            {showResults ? (
              showResults.map((data) => <ProfileCard data={data} />)
            ) : (
              <p>No result found</p>
            )}
          </div>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePage(currentPage - 1)}
            >
              Previous
            </button>
            <button
              disabled={endIndex >= stuData[1]?.length || 0}
              onClick={() => handlePage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDir;
