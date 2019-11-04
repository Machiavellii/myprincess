import React, { Fragment } from 'react';

import Contents from './Contents';

const Content = profile => {
  return (
    <Fragment>
      <Contents profiles={profile} />
    </Fragment>
  );
};

export default Content;
