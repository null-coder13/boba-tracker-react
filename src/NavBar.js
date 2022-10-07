import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NavBar = (props) => {
  useEffect(() => {
    props.setLP();
  });

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" color="inherit" component="div">
              Last Potty: {props.lastPotty}
            </Typography>
            <div />
            <Button
              onClick={props.deleteEntry}
              variant="contained"
              color="error"
            >
              Remove Last Entry
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default NavBar;
