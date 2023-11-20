import React from "react";

//Images
import closeIcon from "../../include/images/close-icon.svg";
import successIcon from "../../include/images/check-icon.ec9704e601f898137e1324568528cfa2.svg";

const AlertSuccess = (props) => {
  return (
    <>
      <span class="alert-icon alert-success-icon">
        <i>
          <img src={successIcon} alt="" />
        </i>
      </span>
      <p>{props.message}</p>
    </>
  );
};

export default AlertSuccess;
