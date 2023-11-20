import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import AlertSuccess from "../../common/alerts/alertSuccess";
import AlertError from "../../common/alerts/alertError";
import { getUser, verifyOtpAndSignup } from "../../store/users";
import { toast } from "react-toastify";
import Header from "./header";
import {
  getRedirectUrl,
  removeKey,
  setToken,
  setProfile
 
} from "../../utils/localStorageServices";
import { useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import NextButton from "../../common/form/nextButton";
const SignupStepTwo = (props) => {
  var ref = useRef();
  const textBoxOne = useRef(null);
  const textBoxTwo = useRef(null);
  const textBoxThree = useRef(null);
  const textBoxFour = useRef(null);
  const textBoxFive = useRef(null);
  const textBoxSix = useRef(null);

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null,
    six: null,
  });
  const [error, setError] = useState({});
  console.log(props?.steps);

  const verifyCode = (e) => {
    if (
      code?.first &&
      code?.second &&
      code?.third &&
      code?.fourth &&
      code?.fifth &&
      code?.six
    ) {
      setError({});
      e.preventDefault();
      ref && ref.current && ref.current.continuousStart();
      setLoading(true);
      const payload = {
        code: `${code?.first}${code?.second}${code?.third}${code?.fourth}${code?.fifth}${code?.six}`,
        token:
          props?.steps && props?.steps?.data.token
            ? props?.steps?.data.token
            : "",
      };

      props.verifyOtpAndSignup(payload, (res) => {
        if (res.status === 200) {
          const data = res.data.data;
          const { accessToken, refreshToken } = data;
          setToken(refreshToken, accessToken);
          setProfile(data);
          const redirectUrl = getRedirectUrl();

          if (redirectUrl) {
            removeKey("redirectUrl");
            window.location.assign(`${redirectUrl}`);
          }
          props.setSteps({
            step: 3,
            data: {
              ...props.steps.data,
              profileData: res?.data?.data,
              profileImage: props?.steps?.data?.profileImage,
            },
          });

         
          ref && ref.current && ref.current.complete();
          setLoading(false);
          toast(<AlertSuccess message="Information Saved" />);
        } else {
         
          ref && ref.current && ref.current.complete();
          setLoading(false);
          toast(
            <AlertError
              message={
                res && res.data && res.data.message
                  ? res.data.message
                  : "Something Went Wrong"
              }
            />
          );
        }
      });
    } else {
      const errors = { ...error };
      errors.message = "Please Enter 6 digit verification code to continue";
      setError(errors);
    }
  };

  const codeChangeHandler = (event) => {
    const element = event.target;
    const nextSibling = element.nextElementSibling;
    nextSibling ? nextSibling.focus() : element.blur();
  };

  return (
    <>
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <div class="page-outer-wrapper font-family-poppins grey-bg min-vh-100">
        <Header data={props?.steps?.data} step="step-2" />
        <div class="registration-flow-container fw-medium">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="rfc-content-holder mx-auto">
                  <div class="rf-head-row">
                    <div class="rf-step-count d-flex align-items-center">
                      Step <span class="rf-current">02</span>{" "}
                      <span class="rf-total">/ 03</span>
                    </div>
                    <h1>Verify Account</h1>
                    <div class="rf-label-box email-label-box">
                      Enter Verification Code sent to{" "}
                      <a class="fw-medium">
                        {props.steps &&
                          props?.steps &&
                          props?.steps?.data &&
                          props?.steps?.data?.email}
                      </a>
                    </div>
                  </div>
                  <form class="rf-form-row-group">
                    <div class="otp-input-fields">
                      <input
                        type="number"
                        class="otp-box"
                        required
                        maxLength={1}
                        min="1"
                        max="1"
                        value={code?.first}
                        ref={textBoxOne}
                        onChange={(e) => {
                          const data = { ...code };
                          data.first = e.target.value.slice(0, 1);
                          setCode(data);
                          codeChangeHandler(e);
                        }}
                      />
                      <input
                        type="number"
                        class="otp-box"
                        required
                        maxLength={1}
                        min="1"
                        max="1"
                        value={code?.second}
                        ref={textBoxTwo}
                        onChange={(e) => {
                          const data = { ...code };
                          data.second = e.target.value.slice(0, 1);
                          setCode(data);
                          codeChangeHandler(e);
                        }}
                      />
                      <input
                        type="number"
                        class="otp-box"
                        required
                        maxLength={1}
                        min="1"
                        max="1"
                        value={code?.third}
                        ref={textBoxThree}
                        onChange={(e) => {
                          const data = { ...code };
                          data.third = e.target.value.slice(0, 1);
                          setCode(data);
                          codeChangeHandler(e);
                        }}
                      />
                      <input
                        type="number"
                        class="otp-box"
                        required
                        maxLength={1}
                        min="1"
                        max="1"
                        value={code?.fourth}
                        ref={textBoxFour}
                        onChange={(e) => {
                          const data = { ...code };
                          data.fourth = e.target.value.slice(0, 1);
                          setCode(data);
                          codeChangeHandler(e);
                        }}
                      />
                      <input
                        type="number"
                        class="otp-box"
                        required
                        maxLength={1}
                        min="1"
                        max="1"
                        value={code?.fifth}
                        ref={textBoxFive}
                        onChange={(e) => {
                          const data = { ...code };
                          data.fifth = e.target.value.slice(0, 1);
                          setCode(data);
                          codeChangeHandler(e);
                        }}
                      />
                      <input
                        type="number"
                        class="otp-box"
                        required
                        maxLength={1}
                        min="1"
                        max="1"
                        value={code?.six}
                        ref={textBoxSix}
                        onChange={(e) => {
                          const data = { ...code };
                          data.six = e.target.value.slice(0, 1);
                          setCode(data);
                          codeChangeHandler(e);
                        }}
                      />
                    </div>
                    {error.message ? (
                      <p style={{ color: "red", fontSize: "14px" }}>
                        {error.message}
                      </p>
                    ) : (
                      ""
                    )}
                    <div class="rf-form-btn d-flex align-items-center justify-content-end">
                      <NextButton
                        handleSubmit={(e) => {
                          verifyCode(e);
                        }}
                        loading={loading}
                        classData={"btn btn-default btn-lg"}
                        label="Continue"
                        page={"signup"}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  verifyOtpAndSignup: (data, callback) =>
    dispatch(verifyOtpAndSignup(data, callback)),
});

const mapStateToProps = (state) => ({
  getUser: getUser(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SignupStepTwo));
