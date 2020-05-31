import React, { useState, useEffect } from "react";
import "./LeaderBoard.css";
import axiosInstance from "../../api";


function LeaderBoard() {
    // Render Table

    const [info, setInfo] = useState([
        {
            num: "",
            name: "",
            yr: "",
            score: ""
        }
    ]);

    useEffect(() => {
        setInfo([{
            num: "1",
            name: "Annamalai",
            yr: "4th yr",
            score: "8"
        }, {
            num: "1",
            name: "Annamalai",
            yr: "4th yr",
            score: "12"
        }]);
    }, [info]);
    const renderCurrentRows = () => {

        if (info != null) {

            return info.map((details, index) => {
                const { num, name, yr, score } = details
                return (
                    <tr class={score >= 10 ? "active" : ""}>
                        <td className="fontColor" >{num} </td>
                        <td className="fontColor">{name}</td>
                        <td className="fontColor">{yr}</td>
                        <td className="fontColor"> {score}  </td>
                    </tr>
                );
            });
        }
    };
    return (
        <div>
            <div className="container">

                <span className="pageheading">   LeaderBoard </span>
                {/* <img
                    src={process.env.PUBLIC_URL + "/Image/home.png"}
                    alt="Loading..."
                  
                    className="homeIcon"
                /> */}
            </div>
            <br />
            <table class="ui celled table" >
                <thead >
                    <tr >
                        <th >S.No</th>
                        <th >Name</th>
                        <th >Class</th>
                        <th >Score</th>
                    </tr>
                </thead>
                <tbody >
                    {renderCurrentRows()}
                </tbody>
            </table>

        </div>
    );

}
export default LeaderBoard;


