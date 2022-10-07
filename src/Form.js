import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { addEntry } from "./services/httpService";

function Form(props) {
  const [pee, setPee] = useState(false);
  const [poo, setPoo] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "pee") {
      setPee(!pee);
    } else if (name === "poo") {
      setPoo(!poo);
    }
  }

  function submitEntry() {
    addEntry(poo, pee)
      .then((res) => {
        props.handleSuccess(true);
        props.setLP(res.data.dateTimeId);
        setPee(false);
        setPoo(false);
      })
      .catch((err) => props.handleSuccess(false));
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 10 }}>
      <FormGroup>
        <FormControlLabel
          control={<Switch name="pee" checked={pee} onChange={handleChange} />}
          label="Pee"
        />
        <br />
        <FormControlLabel
          control={<Switch name="poo" checked={poo} onChange={handleChange} />}
          label="Poo"
        />
        <br />
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={submitEntry} sx={{ mt: 5 }}>
            Submit
          </Button>
        </Stack>
      </FormGroup>
    </Box>
  );
}

export default Form;
