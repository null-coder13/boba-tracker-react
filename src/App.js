import React, { useState } from "react";
import "./App.css";
import NavBar from "./NavBar";
import Form from "./Form";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  getLastEntry,
  deleteLastEntry,
  getLastPoo,
} from "./services/httpService";

function App() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [lastPotty, setLastPotty] = useState();

  function handleSuccess(res) {
    res ? setSuccess(true) : setFailure(true);
  }

  function convertDateTime(dateTime) {
    const date = new Date(Date.parse(dateTime));

    let minutes;
    if (date.getMinutes() < 10) {
      minutes = "0" + date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }

    return `${date.getHours()}:${minutes} on ${
      date.getMonth() + 1
    }/${date.getUTCDate()}`;
  }

  function convertPooTime(dateTime) {
    const date = new Date(Date.parse(dateTime));

    let minutes;
    if (date.getMinutes() < 10) {
      minutes = "0" + date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }

    return `${date.getHours()}:${minutes}`;
  }

  function setLP() {
    let potty;
    getLastEntry()
      .then((res) => {
        potty = convertDateTime(res.data.dateTimeId);
      })
      .then((res) => {
        getLastPoo().then((res) => {
          console.log(potty);
          console.log(res.data);
          potty += " || Last Poo: " + convertPooTime(res.data);
          setLastPotty(potty);
        });
      });
  }

  function setLPNonRequest(newEntry) {
    let potty;
    if (newEntry.hasPooped) {
      potty = convertDateTime(newEntry.dateTimeId);
      potty += " || Last Poo: " + convertPooTime(newEntry.dateTimeId);
    } else {
      //get the last potty
      const lastPooTime = lastPotty.split("||");
      console.log(lastPooTime);
    }
    setLastPotty(potty);
  }

  function deleteEntry() {
    deleteLastEntry().then((res) => {
      if (res.data) setLP();
    });
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setFailure(false);
  }

  return (
    <div className="App">
      <NavBar
        setLastPotty={setLastPotty}
        lastPotty={lastPotty}
        setLP={setLP}
        deleteEntry={deleteEntry}
      />
      <Form handleSuccess={handleSuccess} setLP={setLPNonRequest} />
      <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Entry was successfully submitted!
        </Alert>
      </Snackbar>
      <Snackbar open={failure} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Error submitting entry
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
