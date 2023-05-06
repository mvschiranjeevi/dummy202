import React from "react";

function Featurebox(props) {
  return (
    <div className="a-box">
      <div className="a-b-img">
        <img src={props.image} alt=""></img>
        <div className="a-b-text">
          <h2>{props.title}</h2>
          <p></p>
        </div>
      </div>
    </div>
  );
}
export default Featurebox;
