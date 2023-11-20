import React from "react";
import { Modal } from "react-bootstrap";
import close from "../../../include/images/close.svg";
import NextButton from "../../../common/form/nextButton";

const NewsLetterSubscribers = (props) => {
  return (
    <Modal
      className="modal fade environmental-inclusion-modal custom-floating-input"
      id="addOrganizationModal"
      dialogClassName="modal-dialog modal-dialog-centered modal-lg"
      show={props.show}
      onHide={() => props.onHide()}
      enforceFocus={false}
    >
      <div class="modal-header pb-0">
        <h5 class="modal-title text-capitalize">{props.heading}</h5>
        <button
          type="button"
          class="close-btn d-flex align-items-center justify-content-center"
          onClick={() => props.onHide()}
        >
          <img src={close} alt="" className="modal-close-btn" />
        </button>
      </div>
      <Modal.Body className="custom-modal-body flex-grow-1 w-100 overflow-hidden">
        {/*  */}
        <div className="offcanvas-widget-row pt-0 filter-margin">
          <div className="form-group " style={{ marginBottom: "20px" }}>
            <label htmlFor="keyword" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              onChange={(e) => {
                props.setSubscribeValues(e.target.value.trim());
              }}
            />
          </div>
          {props.error && props.error?.name ? (
            <p style={{ color: "red" }}>{props.error?.name}</p>
          ) : (
            ""
          )}
        </div>
        {/*  */}
        <div class="row row-form-button justify-content-end">
          <div class="col-sm-6 ps-sm-0">
            <NextButton
              label="Submit"
              classData={"btn btn-default btn-block "}
              handleSubmit={(e) => {
                props.handleSubmit(e);
              }}
              loading={props.loading}
            />
            {/* Submit
              </NextButton> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(NewsLetterSubscribers);
