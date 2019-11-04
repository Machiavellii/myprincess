import React from 'react';
import Review from './componentGirls/Review';
import Links from './componentGirls/Links';
import About from './componentGirls/Aboutgirl';
import View from './componentGirls/View';

const Girl = ({ profile }) => {
  return (
    <div className="describe-girl">
      <div className="container">
        <Review profile={profile} />
        <About profile={profile} />
        <Links profile={profile} />
        <View profile={profile} />
      </div>
    </div>
  );
};

export default Girl;
