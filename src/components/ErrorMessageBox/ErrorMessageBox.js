import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import "./ErrorMessageBox.css";

const ErrorMessageBox = (props) => (
  <div className='ErrorMessageBox'>
    <InfoIcon /> <span>{props.children}</span>
  </div>
);

export default ErrorMessageBox;
