import React from "react";
import { useDispatch } from "react-redux";
import logout from "../actions/logout";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import LogogoutIcon from "@mui/icons-material/Logout";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
  };
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#9c27b0" }}>
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="h5">Expense Tracker</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                width: 170,
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="/add/expense"
                style={{ textDecoration: "none", display: "flex" }}
              >
                <Add sx={{ width: 35, color: "green" }}></Add>
                <Typography color="green">ADD EXPENSE</Typography>
              </Link>
            </Box>

            <Button sx={{ color: "#fff" }} onClick={(e) => handleLogout(e)}>
              <LogogoutIcon></LogogoutIcon>Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Link to="/all/expense">List Expenses</Link>
    </div>
  );
}

export default Home;
