import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import image from "./assets/image.png"; // Ensure the correct path

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/predict");
  };

  return (
    <div className="home  container text-center">
      {" "}
      {/* Heading */} <h1> Welcome to Diabetes Prediction </h1>{" "}
      <p> Check your risk of diabetes with our prediction tool. </p>{" "}
      {/* Row for Side-by-Side Layout */}{" "}
      <div className="row align-items-center">
        {" "}
        {/* Left Column - Info Box */}{" "}
        <div className="col-md-6">
          <div className="info-box">
            <p>
              Diabetes is a chronic health condition that occurs when the body
              either cannot produce enough insulin or cannot effectively use the
              insulin it produces.Insulin is a hormone that regulates blood
              sugar(glucose), which is the primary source of energy for the body
              's cells. <br /> <br />{" "}
              <p>
                Our prediction model{" "}
                <strong> analyzes key health indicators </strong> such as
                glucose levels, blood pressure, BMI, and age to assess the risk
                of diabetes.It provides a{" "}
                <strong> personalized prediction </strong> along with the
                probability, helping you take proactive steps toward better
                health.{" "}
                <div>
                  {" "}
                  <button
                    type="button"
                    className="btn btn-outline-warning mt-4"
                    onClick={handleGetStarted}
                  >
                    Get Started{" "}
                  </button>{" "}
                </div>{" "}
              </p>{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Right Column - Image */}{" "}
        <div className="col-md-6 text-center">
          <img src={image} alt="Diabetes" className="image img-fluid" />
        </div>{" "}
      </div>{" "}
      {/* Bootstrap Button */}{" "}
    </div>
  );
}

export default Home;
