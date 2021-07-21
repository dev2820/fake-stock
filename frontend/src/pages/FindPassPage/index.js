import React from "react";
import FindPassForm from "../../containers/FindPassForm";
const FindPassPage = () => {
  return (
    <div>
      <div className="center">
        <FindPassForm />
      </div>
      {/* {!this.props.accessToken && <Redirect to="/" />} */}
    </div>
  );
}
export default FindPassPage;