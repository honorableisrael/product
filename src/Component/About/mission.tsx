import * as React from "react";
import "./About.css";

const ActiveView = (props:any) => {
  return (
    <>
      <div className="mesheader">{props.heading}</div>
      <div className="mesbody">
        {props.body}
      </div>
    </>
  );
};
export default ActiveView;
