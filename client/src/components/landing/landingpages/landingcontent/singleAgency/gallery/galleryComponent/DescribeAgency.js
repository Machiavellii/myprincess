import React from 'react';

const DescribeAgency = ({ agency }) => {
  const { category, numberOfGirls, recruitment, languages, rate } = agency;
  return (
    <div className="simple-describe mb-5">
      <h6>Category:</h6>
      <p className="mb-1">{category}</p>
      <h6>Number Of Girls:</h6>
      <p>{numberOfGirls}</p>
      <h6 className="mt-4">Recruitment:</h6>
      <p>{recruitment}</p>
      <h6 className="mt-4">Spoken languages:</h6>
      {languages.map((lang, i) => (
        <p key={i}>{lang}</p>
      ))}

      <h6 className="mt-4">Minimun rate:</h6>
      <p>From CHF {rate}</p>
    </div>
  );
};

export default DescribeAgency;
