import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Make sure this file is updated
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

function Predict() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="predict">
      <div className="container py-5">
        <h1 className="text-center text-white mb-4"> Diabetes Prediction </h1>{" "}
        <form onSubmit={handleSubmit}>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {" "}
            {Object.keys(formData).map((key, index) => (
              <div className="col" key={index}>
                <div className="card h-100 shadow">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">
                      {" "}
                      {key.replace(/([A-Z])/g, " $1")}{" "}
                    </h5>{" "}
                    <input
                      type="number"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-4">
              Predict{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
        {error && <p className="text-danger text-center mt-3"> {error} </p>}{" "}
        {prediction && (
          <div className="card result-card mt-4 shadow">
            <div className="card-body text-center">
              <h2 className="card-title"> Prediction Result </h2>{" "}
              <p className="card-text">
                <strong> Prediction: </strong>{" "}
                {prediction.prediction === 1 ? "Diabetic" : "Not Diabetic"}{" "}
              </p>{" "}
              <p className="card-text">
                <strong> Probability: </strong>{" "}
                {(prediction.probability * 100).toFixed(2)} %{" "}
              </p>{" "}
            </div>{" "}
          </div>
        )}{" "}
        <div className="text-center mt-3">
          <button onClick={handleGoHome} className="btn btn-outline-secondary">
            Back to Home{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Predict;
