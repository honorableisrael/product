import * as React from "react";
import { Link } from "react-router-dom";

export interface IAppProps {}

export function NavIsLoggedOut(props: IAppProps) {
  return (
    <React.Fragment>
      <div className="title1 shiftlefff">
        <Link to="/signin">
          <button className="title_t">LOGIN</button>
        </Link>
      </div>
    </React.Fragment>
  );
}
