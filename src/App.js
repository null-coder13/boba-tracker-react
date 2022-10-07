import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./NavBar";
import Form from "./Form";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Alert from "@mui/material/Alert";
import { getLastEntry, deleteLastEntry } from "./services/httpService";

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

    return `${date.getHours()}:${minutes} on ${ date.getMonth() + 1 }/${date.getUTCDate()}`;
  }

  function setLP() {
    getLastEntry().then((res) => {
      setLastPotty(convertDateTime(res.data.dateTimeId));
    });
  }

  function setLPNonRequest(newEntry) {
    setLastPotty(convertDateTime(newEntry));
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
