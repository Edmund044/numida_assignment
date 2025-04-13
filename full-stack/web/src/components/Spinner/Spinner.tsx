import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner: React.FC = () => (
  <div style={{ display: "flex",marginLeft:"700px", justifyContent: "center", alignItems: "center", height: "100%" }}>
    <CircularProgress />
  </div>
);

export default Spinner;
