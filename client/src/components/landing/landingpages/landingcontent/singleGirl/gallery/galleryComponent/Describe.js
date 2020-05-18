import React from 'react';

const Describe = ({ profile }) => {
  const { category, age, silhouette, origin, languages, rate } = profile;
  return (
    <div className="simple-describe mb-5">
      <h6>Category:</h6>
      <p className="mb-1">{category}</p>
      <h6>Age:</h6>
      <p>{age}</p>
      <h6 className="mt-4">Silhouette:</h6>
      <p>{silhouette}</p>
      <h6 className="mt-4">origin:</h6>
      <p>{origin}</p>
      <h6 className="mt-4">Spoken languages:</h6>
      {languages.map((lang, i) => (
        <p key={i}>{lang}</p>
      ))}

      <h6 className="mt-4">Minimun rate:</h6>
      <p>From CHF {rate}</p>
    </div>
  );
};

export default Describe;
