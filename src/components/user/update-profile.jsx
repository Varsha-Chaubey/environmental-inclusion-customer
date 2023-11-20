import React from "react";
import UpdateProfile1 from "./update-profile-1";
import { useState } from "react";
import UpdateProfile2 from "./update-profile-2";
import UpdateProfile3 from "./update-profile-3";
import UpdateProfile4 from "./update-profile-4";
import UpdateProfile5 from "./update-profile-5";
import UpdateProfile6 from "./update-profile-6";
import FinalProfileUpdate from "./final-profile-update";
import SignupSetup1 from "./signup-setup-1";
import SignupSetup2 from "./signup-setup-2";

const UpdateProfile = (props) => {
  const [steps, setSteps] = useState({ step: 1, data: {} });
  return (
    <>
      {steps.step === 1 ? (
        <SignupSetup1 steps={steps} setSteps={setSteps} />
      ) : (
        ""
      )}
       {steps.step === 2 ? (
        <SignupSetup2 steps={steps} setSteps={setSteps} />
      ) : (
        ""
      )}
      {steps.step === 3 ? (
        <UpdateProfile1 steps={steps} setSteps={setSteps} />
      ) : (
        ""
      )}
      {steps.step === 4 ? (
        <UpdateProfile2 steps={steps} setSteps={setSteps} />
      ) : (
        ""
      )}
      {steps.step === 5 ? (
        <UpdateProfile3 steps={steps} setSteps={setSteps} />
      ) : (
        ""
      )}
      {steps.step === 6 ? (
        <UpdateProfile4 steps={steps} setSteps={setSteps} />
      ) : (
        ""
      )}
      {steps.step === 7 ? (
        <UpdateProfile5 steps={steps} setSteps={setSteps} />
      ) : (
        ""
      )}
      {steps.step === 8 ? (
        <UpdateProfile6 steps={steps} setSteps={setSteps} />
      ) : (
        ""
      )}
      {steps.step === 9 ? (
        <FinalProfileUpdate steps={steps} setSteps={setSteps} />
      ) : (
        ""
      )}
    </>
  );
};

export default UpdateProfile;
