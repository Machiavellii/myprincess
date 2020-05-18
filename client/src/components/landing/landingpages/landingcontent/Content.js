import React, { Fragment } from "react";

import Contents from "./Contents";

const Content = (profile, agency) => {
  return (
    <Fragment>
      <Contents profiles={profile} agencies={agency} />
    </Fragment>
  );
};

export default Content;
