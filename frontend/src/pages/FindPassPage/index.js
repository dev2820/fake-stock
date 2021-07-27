import React from "react";
import FindPassForm from "../../containers/FindPassForm";
const FindPassPage = () => {
  return (
    <React.Fragment>
      <div className="center">
        <FindPassForm />
      </div>
      {/* {!this.props.accessToken && <Redirect to="/" />} */}
    </React.Fragment>
  );
}
export default FindPassPage;