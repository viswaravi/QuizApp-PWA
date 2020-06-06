import React, { useEffect, useState, Fragment } from "react";
import "./styles.css";
import { useHistory } from "react-router-dom";

const Feedback = () => {
  let history = useHistory();
  const [showQuestionSubmission, setShowQuestionSubmission] = useState(true);

  useEffect(() => {}, []);

  return (
    <div>
      {showQuestionSubmission ? <Submission /> : null}
      Feedback
    </div>
  );
};

const Submission = () => {
  return <div>Submittted</div>;
};

export default Feedback;
