// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function App() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //CSS

  const heading = {
    fontFamily: "poppins",
    fontSize: "25px",
    fontWeight: "600",
  };

  const otpInput = {
    height: "3rem",
    width: "3rem",
    marginLeft: "1rem",
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "20px",
    fontFamily: "Poppins",
  };

  const submitbtn = {
    paddingLeft: "35px",
    paddingRight: "35px",
    paddingTop: "10px",
    paddingBottom: "10px",
    border: "none",
    backgroundColor: "#06125c",
    borderRadius: "6px",
    marginTop: "10px",
    color: "white",
    fontFamily: "poppins",
    fontSize: "20px",
  };

  const output = {
    fontFamily: "poppins",
    fontSize: "20px",
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError(false);
      if (index < 5) document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    setCode(["", "", "", "", "", ""]);
    const paste = e.clipboardData.getData("text");
    // console.log(paste);
    if (paste.length < 6) {
      setCode(["", "", "", "", "", ""]);
      console.log(code);
    }
    console.log(paste);
    setCode(paste.split(""));
    setError(false);
  };

  const handleSubmit = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length < 6) {
      setError(true);
      return;
    }

    const response = await axios.post(
      "https://ot-pverification.vercel.app/verify",
      {
        code: verificationCode,
      }
    );
    if (response.status === 200) {
      navigate("/success");
      return;
    } else {
      setError(true);
      return;
    }
  };

  return (
    <div>
      <label style={heading}>Verification Code:</label>
      <div className="input-group">
        {code.map((value, index) => (
          <input
            key={index}
            id={`digit-${index}`}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleInputChange(e, index)}
            style={otpInput}
            onPaste={handlePaste}
          />
        ))}
      </div>
      {error && <p style={output}>Verification Error</p>}
      <button onClick={handleSubmit} style={submitbtn}>
        SUBMIT
      </button>
    </div>
  );
}
