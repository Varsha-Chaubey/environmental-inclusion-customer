import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import close from "../../../include/images/close.svg";

const ShowMoreRegionsModal = (props) => {
  const [value, setValue] = useState([]);

  const [filteredValues, setFilteredValues] = useState([]);
  const [textSearched, setTextSearched] = useState("");
  useEffect(() => {
    if (props.show) {
      const data = [...props.selectRegion];
      setValue(data);
      setFilteredValues(props.otherRegion);
    }
  }, [props.show]);

  const [screenWidth, setWidth] = useState(0);
  useEffect(() => {
    let width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    setWidth(width);
  }, []);

  return (
    <Modal
      className="modal fade environmental-inclusion-modal custom-floating-input  "
      id="addOrganizationModal"
      dialogClassName="modal-dialog modal-dialog-centered modal-lg"
      show={props.show}
      onHide={() => props.onHide()}
      enforceFocus={false}
      contentClassName="endangered-viewall"
    >
      <div className="modal-content d-flex flex-column">
        <div class="modal-header pb-0 modal-head view-all-header">
          <h5 class="modal-title text-capitalize">{props.heading}</h5>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={textSearched}
              className="form-control region-viewall-modal-search search-view-modal "
              onChange={(e) => setTextSearched(e.target.value)}
            />
            <button
              type="button"
              class="close-btn d-flex region-viewall-modal-close-btn align-items-center justify-content-center modal-close"
              onClick={() => props.onHide()}
            >
              <img src={close} alt="" className="modal-close-btn" />
            </button>
          </div>
        </div>
        <Modal.Body className="custom-modal-body flex-grow-1 w-100 overflow-hidden">
          <div class="two-row-column d-flex flex-wrap">
            <div class="tr-column  position-relative">
              <div class="tr-column-content w-100 h-100 d-flex flex-column">
                <table class="table table-borderless align-middle table-left-align">
                  <colgroup>
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr className="d-flex" style={{ flexWrap: "wrap" }}>
                      {filteredValues && filteredValues.length > 0
                        ? filteredValues
                            .filter((item) =>
                              item.name
                                ?.toLowerCase()
                                ?.includes(textSearched?.toLowerCase())
                            )
                            .map((list, idx) => {
                              return (
                                <>
                                  <tr
                                    className="pl-0"
                                    style={{
                                      width: screenWidth <= 700 ? "50%" : "33%",
                                    }}
                                  >
                                    <td>
                                      <div class="form-check tick-checkbox pl-0">
                                        <label class="filter-content-box">
                                          {list.name}
                                          <input
                                            type="checkbox"
                                            checked={value.includes(list._id)}
                                            onChange={() => {
                                              const data = [...value];
                                              const data1 = [
                                                ...props.selectRegionName,
                                              ];
                                              if (data.includes(list._id)) {
                                                const a = data.filter(
                                                  (item) => item != list._id
                                                );
                                                const b = data1.filter(
                                                  (item1) =>
                                                    item1._id != list._id
                                                );
                                                props.setSelectedRegionName(b);
                                                setValue(a);
                                              } else {
                                                data1.push(list);
                                                props.setSelectedRegionName(
                                                  data1
                                                );
                                                data.push(list._id);
                                                setValue(data);
                                              }
                                            }}
                                          />
                                          <span class="checkmark"></span>
                                        </label>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            })
                        : ""}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="row row-form-button justify-content-end">
            <div class="col-sm-6 ps-sm-0">
              <button
                type="submit"
                class="btn btn-default btn-block"
                onClick={() => {
                  const data = [...value];
                  props.setSelectedRegion(data);
                  props.onHide();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default React.memo(ShowMoreRegionsModal);
