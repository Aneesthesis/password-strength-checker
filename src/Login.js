import React, { useState } from "react";

const { checkPasswordStrength } = require("./helper");
const axios = require("axios");

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [stepsUntilStrong, setStepsUntilStrong] = useState(null);

  function onCheckPassword() {
    let steps = checkPasswordStrength(password);
    setStepsUntilStrong(steps);
  }

  async function onSaveHandler() {
    // Save results to MongoDB
    try {
      await axios.post("http://localhost:8080/api/saveResult", {
        password,
        stepsUntilStrong,
        name,
      });
      console.log("Result saved successfully");
    } catch (error) {
      console.error("Error saving result:", error);
    }
  }

  let message =
    stepsUntilStrong === 0
      ? "Your password is strong!"
      : `${stepsUntilStrong} steps to make your password strong!`;

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 border rounded-md">
      <label className="block mb-2">
        Your name:
        <input
          className="block w-full border rounded-md py-2 px-3 mt-1"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="block mb-2">
        Password:
        <input
          className="block w-full border rounded-md py-2 px-3 mt-1"
          type="text" // change to type password later
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md active:bg-blue-600"
        onClick={onCheckPassword}
      >
        Check Strength
      </button>

      {stepsUntilStrong !== null && (
        <>
          <div className="my-4">
            <p className="font-semibold">{message}</p>
          </div>
          <button
            className="text-center text-white mx-auto py-2 px-8 bg-green-400 active:bg-green-500 rounded-md"
            onClick={onSaveHandler}
          >
            Save Result
          </button>
        </>
      )}
    </div>
  );
};

export default PasswordStrengthChecker;
