import React, { ChangeEvent } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [firstEntry, setFirstEntry] = useState<string>("");
  const [secondEntry, setSecondEntry] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleFirstEntryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstEntry(e.target.value);
  };

  const handleSecondEntryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondEntry(e.target.value);
  };

  const handleJourneyCalculation = async () => {
    if (firstEntry && secondEntry) {
      const route: string = `${firstEntry},${secondEntry}`;
      await axios
        .get(
          `https://media.carecontrolsystems.co.uk/Travel/JourneyPlan.aspx?Route=${route}`
        )
        .then((response) => setResult(response.data))
        .catch((error) => console.log(error));
    } else {
      alert("Please enter both entry points.");
    }
  };

  const displayResult = () => (
    <>
      <h3>Journey Information</h3>
      <div>{result.split(",")[0]} minutes of travel time</div>
      <div>{result.split(",")[1].replace(";", "")} miles of travel</div>
    </>
  );

  return (
    <div className="App">
      <h1>Journey Entry</h1>
      <input
        type="text"
        id="first-entry"
        className="entry-input"
        onChange={handleFirstEntryChange}
      />
      <input
        type="text"
        id="second-entry"
        className="entry-input"
        onChange={handleSecondEntryChange}
      />
      <button className="calculate-btn" onClick={handleJourneyCalculation}>
        Calculate Journey
      </button>

      {result && displayResult()}
    </div>
  );
};

export default App;
