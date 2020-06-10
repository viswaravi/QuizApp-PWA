import React, { useEffect, useState, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import "./styles.css";
import Particles from "react-particles-js";
import { sessionService } from "redux-react-session";
import { storeUser } from "../../store/actions/data.action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Header, Image, Modal } from "semantic-ui-react";

const Welcome = (props) => {
  let history = useHistory();

  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    sessionService
      .loadUser()
      .then((currentUser) => {
        props.storeUser(currentUser);
        if (currentUser) {
          history.replace("/");
        }
      })
      .catch((err) => {
        //console.log(err)
      });
  }, []);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 768px)",
  });

  return (
    <Fragment>
      <div id="homeContainer">
        <div id="clubHead">
          {isDesktopOrLaptop ? (
            <Fragment>
              Literary Association And Tamil Mandram
              <p>presents</p>
            </Fragment>
          ) : (
            <Fragment>
              <div>
                Literary Association <br /> And Tamil Mandram
              </div>
              <p>presents</p>
            </Fragment>
          )}
        </div>
        <div id="appName">
          <div>Quiz Up</div>
          <br />
          <p>The Lockdown Quiz</p>
        </div>
        <div id="welcome">
          <p>
            Welcome to <b> QuizUp.</b>
          </p>
          <div
            className="btnOption dm"
            onClick={() => {
              setShowRules(true);
            }}
          >
            Rules
          </div>
          <div
            className="btnOption ca"
            onClick={() => {
              history.push("/register");
            }}
          >
            Create Account
          </div>
          <div id="login">
            Have an account already?{" "}
            <a
              onClick={() => {
                history.push("/login");
              }}
            >
              <b> Log in</b>
            </a>
          </div>
        </div>
      </div>
      <Modal open={showRules} size="small">
        <Modal.Header>Quiz Rules</Modal.Header>
        <Modal.Content>
          <ul>
            <li>
              <p>
                All Participants will receive an E-certificate for the quizzes
                they attend.
              </p>
            </li>
            <br />
            <li>
              <p>
                At the end of the events, the leaderboard toppers will get
                exciting prizes.
              </p>
              <br />
            </li>

            <li>
              <p>
                Each Quiz will have a pass mark, participants scoring only above
                pass marks will be issued a certificate.
              </p>
              <br />
            </li>

            <li>
              <p>Anyone (students, faculty) can participate in the event.</p>
              <br />
            </li>

            <li>
              <p>
                "Mania" Quizzes will have more weightage than other quizzes.
                Mania quizzes will have 2 points per question. Other Quizzes
                will have 1 point per question.
              </p>
            </li>
          </ul>
        </Modal.Content>
        <Modal.Actions>
          <div id="modalAction">
            <div
              className="modalBtn"
              onClick={() => {
                setShowRules(false);
              }}
            >
              {" "}
              <img src={require("../../assets/images/good.png")} />
              <h4> I Actually read the rules</h4>
            </div>
            <div
              className="modalBtn"
              onClick={() => {
                setShowRules(false);
              }}
            >
              {" "}
              <img src={require("../../assets/images/bad.png")} />
              <h4>Nah, Just checking if it works</h4>
            </div>
          </div>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  storeUser: (data) => dispatch(storeUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
