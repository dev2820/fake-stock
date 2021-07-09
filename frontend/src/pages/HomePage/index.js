import React from "react";
import HomepageForm from "../../containers/HomepageForm";
import Wave from "../../components/Wave";

const Homepage = () => {
  return (
    <div>
      <Wave />
      <div className="center">
        <HomepageForm />
      </div>
    </div>
  );
};

export default Homepage;
