import React from "react";
import { RENDER_COUNT } from "../../consts";

const ActionButtons = ({ dataToRender, mainData, onLoadMore, onLoadAll }) => (
  <div className="buttons">
    <button
      onClick={onLoadMore}
      disabled={dataToRender.length === mainData.length}
    >
      Load +{RENDER_COUNT} More
    </button>
    <button onClick={onLoadAll}>Load All</button>
  </div>
);

export default ActionButtons;
