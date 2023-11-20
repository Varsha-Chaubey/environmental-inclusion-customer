import React from "react";

const NearToExtinct = (props) => {
  return (
    <>
      <div class="ei-statistics-container mt-60">
        <div class="ei-heading">
          <h4>Near to Extinction</h4>
        </div>
        <ul class="ei-statistics-list d-flex flex-wrap">
          {props.speciesCategory &&
            props.speciesCategory.data &&
            props.speciesCategory.data.length > 0 &&
            props.speciesCategory.data.map(
              (item, i) =>
                i <= 8 && (
                  <li class="ei-statistics-item">
                    <div class="ei-statistics-box d-flex">
                      <div class="esb-text">{item.name}</div>
                      <div class="esb-number">{item.extinctionPercentage}%</div>
                    </div>
                  </li>
                )
            )}
        </ul>
      </div>
    </>
  );
};

export default NearToExtinct;
