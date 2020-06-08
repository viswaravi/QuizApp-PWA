import React, { useState, useEffect, Fragment } from "react";
import "./styles.css";
import { Dropdown } from "semantic-ui-react";
import axiosInstance from "../../api";
import { useHistory } from "react-router-dom";

function Register() {
  let history = useHistory();
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [mail, setMail] = useState(null);
  const [pass, setPass] = useState(null);
  const [roll, setRoll] = useState(null);
  const [year, setYear] = useState(null);
  const [dept, setDept] = useState(null);
  const [section, setSection] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isUniqueUser, setUniqueUser] = useState(true);

  const [deptOptions, setdeptOptions] = useState([]);
  const [sectOptions, setSectOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    if (fname && lname && mail && pass && roll && year && dept && section) {
      setIsEnabled(true);
    }
  }, [fname, lname, mail, pass, roll, year, dept, section]);

  useEffect(() => {
    loadYear();
    loadDept();
    loadSection();
  }, []);

  const loadYear = () => {
    axiosInstance({
      method: "get",
      url: `metadata/year`,
      timeout: 5000,
    })
      .then((response) => {
     //   console.log("year :", response.data.year);

        let options = [];

        response.data.year.map((year) => {
          options.push({
            key: year.name,
            value: year.name,
            text: year.name,
          });
        });

        setYearOptions(options);
      })
      .catch((error) => {
       // console.log("Dept FETCH FAIL :", error);
      });
  };

  const loadDept = () => {
    axiosInstance({
      method: "get",
      url: `metadata/department`,
      timeout: 5000,
    })
      .then((response) => {
       // console.log("Department :", response.data.department);

        let options = [];

        response.data.department.map((dept) => {
          options.push({
            key: dept.id,
            value: dept.name,
            text: dept.name,
          });
        });

        setdeptOptions(options);
      })
      .catch((error) => {
       // console.log("Dept FETCH FAIL :", error);
      });
  };

  const loadSection = () => {
    axiosInstance({
      method: "get",
      url: `metadata/section`,
      timeout: 5000,
    })
      .then((response) => {
     //   console.log("Section :", response.data.section);

        let options = [];

        response.data.section.map((sec) => {
          options.push({
            key: sec.id,
            value: sec.name,
            text: sec.name,
          });
        });

        setSectOptions(options);
      })
      .catch((error) => {
      //  console.log("Dept FETCH FAIL :", error);
      });
  };

  const register = (props) => {
    axiosInstance({
      method: "post",
      url: `user`,
      timeout: 5000,
      data: {
        user: [
          {
            roll_no: roll,
            email: mail,
            password: pass,
            first_name: fname,
            last_name: lname,
            year: year,
            department: dept,
            section: section,
          },
        ],
      },
    })
      .then((response) => {
      //  console.log("SINUP SUCCESS :", response.data);

        if (response.data.code == "SUCCESS") {
          // Move to Login
          history.replace("/");
        } else {
          // Try Later
        }
      })
      .catch((error) => {
      //  console.log("SIGN UP FAIL :", error);
      });
  };

  const checkUniqueUser = () => {
    if (roll != null) {
      axiosInstance({
        method: "post",
        url: `user/unique`,
        timeout: 5000,
        data: {
          roll_no: roll,
        },
      })
        .then((response) => {
       //   console.log("Unique User Check:", response.data);

          if (response.data.unique == false) {
            setUniqueUser(false);
          } else {
            // Try Later
            setUniqueUser(true);
          }
        })
        .catch((error) => {
        //  console.log("Unique user Check FAIL :", error);
        });
    }
  };

  return (
    <div id="registerContainer">
      <form>
        <h4 className="heading">Signup</h4>
        <br />
        <div className="formElt">
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div className="formElt">
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div className="formElt">
          <input
            type="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setMail(e.target.value)}
          />
          <p id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </p>
        </div>
        <div className="formElt">
          <input
            className={`${isUniqueUser ? "" : "formEltInValid"}`}
            type="text"
            placeholder="Roll number"
            onChange={(e) => {
              setRoll(e.target.value);
            }}
            onBlur={checkUniqueUser}
          />
          {!isUniqueUser ? (
            <p className="validationText">Username already present</p>
          ) : null}
        </div>

        <div className="formElt">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <p>Year</p>
        <div class="radioButton">
          {yearOptions.map((yearOption) => {
            return (
              <Fragment>
                <div class="ui radio checkbox">
                  <input
                    type="radio"
                    value={yearOption.value}
                    name="year"
                    onChange={(e) => setYear(yearOption.value)}
                  />
                  <label>{yearOption.text}</label>
                </div>
                &nbsp;&nbsp;&nbsp;
              </Fragment>
            );
          })}
        
        </div>
        <br />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Dropdown
            placeholder="Department"
            options={deptOptions}
            fluid
            compact
            search
            selection
            value={dept}
            onChange={(event, { value }) => {
              setDept(value);
            }}
          />

          <Dropdown
            placeholder="Section"
            value={section}
            fluid
            compact
            search
            selection
            options={sectOptions}
            onChange={(event, { value }) => {
              setSection(value);
            }}
          />
        </div>

        <br />
        <br />
        <div
          onClick={isEnabled ? register : null}
          className="btnSignUp"
          style={isEnabled ? null : { opacity: 0.7 }}
        >
          Sign Up
        </div>
      </form>
    </div>
  );
}
export default Register;
