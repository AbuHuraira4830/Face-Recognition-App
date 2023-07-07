import React from "react";
import "./linkForm.css";
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {
          "This Magic brain will detect your faces in pictures.Give any link of an online image"
        }
      </p>
      <div className="center">
        <div className="center pa4 br3 shadow-5 form">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
          />
          <button
            onClick={onButtonSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
