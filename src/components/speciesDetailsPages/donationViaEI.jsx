import React from "react";
import { Modal } from "react-bootstrap";
import close from "../../include/images/close.svg";
import NextButton from "../../common/form/nextButton";
import Select from "react-select";

const DonationViaEI = (props) => {
  const handleCheck = (e) => {
    props.setIsCheck(e.target.value);
  };


  const customStyles1 = {
    indicatorSeparator: (styles) => ({ display: "none" }),
    option: (provided, state) => ({
      ...provided,
      "&:hover": {
        backgroundColor: "#47ad1d",
        color: "#fff",
      },
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      color: state.isSelected ? "#fff" : "black",
      backgroundColor: state.isSelected ? "#47ad1d" : provided.backgroundColor,
      // maxHeight: "84px",
    }),
    control: (base, state) => ({
      ...base,
      // height: 60,
      minHeight: 42,
      borderColor: state.isFocused ? "#47AD1D" : "#e4e4e4",
      boxShadow: state.isFocused ? "0 0 0 0.5px #47AD1D" : "0",
      border: state.isHovered ? "0" : "1px solid #e4e4e4",

      "&:hover": {
        borderColor: state.isFocused ? "#47AD1D" : "0",
        boxShadow: state.isFocused ? "0 0 0 0.5px #47AD1D" : "0",
      },
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      "&:hover": {
        backgroundColor: "rgb(95, 50, 187, 10%)",
        color: "#6119c0",
      },
    }),
  };
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
        <div className="offcanvas-widget-row pt-0 filter-margin">
          <div className="form-group mb-4">
            <label htmlFor="type" className="form-label">
              Choose Species
            </label>
            <Select
              value={
                props.selectDonation && props.selectDonation.species
                  ? props.selectDonation.species
                  : ""
              }
              className="basic-single"
              classNamePrefix="select-search"
              isMulti
              placeholder="Select"
              styles={customStyles1}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option._id}
              options={props.speciesDropdown}
              name={props.speciesDropdown && props.speciesDropdown.name}
              onChange={(event) => {
                const data = { ...props.selectDonation };
                data.species = event;
                props.setSelectDonation({ ...data });
              }}
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="keyword" className="form-label">
              Name of The Company
            </label>
            <input
              type="text"
              className="form-control"
              id="companyName"
              onChange={(e) => {
                const data = { ...props.selectDonation };
                data.companyName = e.target.value;
                props.setSelectDonation(data);
              }}
            />
            {props.error && props.error?.companyName ? (
              <p style={{ color: "red" }}>{props.error?.companyName}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="keyword" className="form-label">
              Name of The Person
            </label>
            <input
              type="text"
              className="form-control"
              id="personName"
              onChange={(e) => {
                const data = { ...props.selectDonation };
                data.personName = e.target.value;
                props.setSelectDonation(data);
              }}
            />
            {props.error && props.error?.personName ? (
              <p style={{ color: "red" }}>{props.error?.personName}</p>
            ) : (
              ""
            )}
          </div>

          <div style={{ marginBottom: "40px" }}>
            <label htmlFor="selectImage" className="form-label">
              Company Logo
            </label>
            <div className="upload-lg-button position-relative">
              <span className="file-input">
                <input
                  class="form-control position-absolute"
                  id="inputGroupFile02"
                  type="file"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={(e) => {
                    const data = { ...props.selectDonation };
                    data.newImage = true;
                    props.setSelectedImage(e.target.files[0]);
                    props.setSelectDonation(data);
                  }}
                />
                <span
                  id="upload-file-name"
                  className="d-flex align-items-center"
                >
                  {props.selectedImage && props.selectedImage.name
                    ? props.selectedImage.name
                    : ""}
                  {(props.selectDonation &&
                    props.selectDonation.coverImage &&
                    props.selectDonation.coverImage.original) ||
                  props.selectedImage ? (
                    <img
                      class="cross-icon-box"
                      src={close}
                      alt=""
                      onClick={() => {
                        const data = { ...props.selectDonation };
                        data.coverImage = {};
                        props.selectDonation(data);
                        props.setSelectedImage(null);
                      }}
                    />
                  ) : (
                    <p>Browse</p>
                  )}
                </span>
              </span>
            </div>
            {props.error && props.error.image ? (
              <p style={{ color: "red", marginTop: "15px" }}>
                {props.error.image}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="keyword" className="form-label">
              Donation Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              onChange={(e) => {
                const data = { ...props.selectDonation };
                data.amount = e.target.value;
                props.setSelectDonation(data);
              }}
            />
            {props.error && props.error?.amount ? (
              <p style={{ color: "red" }}>{props.error?.amount}</p>
            ) : (
              ""
            )}
          </div>

          <div className="form-group ">
            <label htmlFor="regionDescription" className="form-label">
              Do you wish to display your name on the donor listing page?
            </label>
            <div className="d-flex" style={{ flexDirection: "column" }}>
              <div>
                <label
                  htmlFor="regionDescription"
                  className="form-label"
                  style={{ marginRight: "35px" }}
                >
                  Yes
                </label>
                <input
                  type="radio"
                  className="form-check-input"
                  value={"true"}
                  checked={props.isCheck === "true"}
                  onChange={handleCheck}
                />
              </div>
              <div>
                <label
                  htmlFor="regionDescription"
                  className="form-label"
                  style={{ marginRight: "40px" }}
                >
                  No
                </label>
                <input
                  type="radio"
                  className="form-check-input"
                  value={"false"}
                  checked={props.isCheck === "false"}
                  onChange={handleCheck}
                />
              </div>
            </div>
          </div>
        </div>

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
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(DonationViaEI);
