import React, { useState, useEffect } from "react";
import "./styles.css";
import { Select, Dropdown } from "semantic-ui-react";
import axiosInstance from "../../api";

function Register() {
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

  useEffect(() => {
    if (fname && lname && mail && pass && roll && year && dept && section) {
      setIsEnabled(true);
    }
  }, [fname, lname, mail, pass, roll, year, dept, section]);

  useEffect(() => {
    axiosInstance({
      method: "get",
      url: `metadata/department`,
      timeout: 5000,
    })
      .then((response) => {
        console.log("Department :", response.data.department);

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
        console.log("Dept FETCH FAIL :", error);
      });

    axiosInstance({
      method: "get",
      url: `metadata/section`,
      timeout: 5000,
    })
      .then((response) => {
        console.log("Section :", response.data.section);

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
        console.log("Dept FETCH FAIL :", error);
      });
  }, []);

  const register = () => {
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
        console.log("SINUP SUCCESS :", response.data);

        if (response.data.code == "SUCCESS") {
          // Move to Login
        } else {
          // Try Later
        }
      })
      .catch((error) => {
        console.log("SIGN UP FAIL :", error);
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
          console.log("Unique User Check:", response.data);

          if (response.data.unique == false) {
            setUniqueUser(false);
          } else {
            // Try Later
            setUniqueUser(true);
          }
        })
        .catch((error) => {
          console.log("Unique user Check FAIL :", error);
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

        <div class="radioButton">
          <div class="ui radio checkbox">
            <input
              type="radio"
              value="first"
              name="year"
              onChange={(e) => setYear(e.target.name)}
            />
            <label>First yr</label>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div class="ui radio checkbox">
            <input
              type="radio"
              name="second"
              name="year"
              onChange={(e) => setYear(e.target.name)}
            />
            <label>Second yr</label>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div class="ui radio checkbox">
            <input
              type="radio"
              value="third"
              name="year"
              onChange={(e) => setYear(e.target.name)}
            />
            <label>Third yr</label>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div class="ui radio checkbox">
            <input
              type="radio"
              value="final"
              name="year"
              onChange={(e) => setYear(e.target.name)}
            />
            <label>Final yr</label>
          </div>
          &nbsp;&nbsp;&nbsp;
          <div class="ui radio checkbox">
            <input
              type="radio"
              value="me/phd"
              name="year"
              onChange={(e) => setYear(e.target.name)}
            />
            <label>ME/PhD</label>
          </div>
        </div>
        <br />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Dropdown
            placeholder="Department"
            options={deptOptions}
            fluid
            search
            selection
            value={dept}
            onChange={(event, { value }) => {
              setDept(value);
            }}
          />

          <Select
            placeholder="Section"
            value={section}
            fluid
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
        <div disabled={false} onClick={register} className="btnSignUp">
          Sign Up
        </div>
      </form>
    </div>
  );
}
export default Register;
