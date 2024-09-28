export default function Success() {
  //CSS
  const heading = {
    fontFamily: "poppins",
  };

  const response = {
    fontFamily: "poppins",
  };
  return (
    <>
      <h1 style={heading}>Congratulations!</h1>
      <label style={response}>Your OTP is correct</label>
    </>
  );
}
