import React, { useState } from 'react';

import FsLightbox from 'fslightbox-react';

import img1 from '../../../../../../../img/girls/girl/1.jpeg';
import img2 from '../../../../../../../img/girls/girl/2.jpeg';
import img3 from '../../../../../../../img/girls/girl/3.jpeg';
import img4 from '../../../../../../../img/girls/girl/4.jpeg';
import img5 from '../../../../../../../img/girls/girl/5.jpeg';
import img6 from '../../../../../../../img/girls/girl/6.jpeg';
import img7 from '../../../../../../../img/girls/girl/7.jpeg';
import img8 from '../../../../../../../img/girls/girl/8.jpeg';

const Gallery = ({ profile }) => {
  const [toggler, setToggler] = useState(false);

  return (
    <div className="small-gallery">
      <div className="row">
        <div className="col-4" onClick={() => setToggler(!toggler)}>
          <img src={img1} alt="" />
        </div>
        <div className="col-4" onClick={() => setToggler(!toggler)}>
          <img src={img2} alt="" />
        </div>
        <div className="col-4" onClick={() => setToggler(!toggler)}>
          <img src={img3} alt="" />
        </div>
        <div className="col-4" onClick={() => setToggler(!toggler)}>
          <img src={img4} alt="" />
        </div>
        <div className="col-4" onClick={() => setToggler(!toggler)}>
          <img src={img5} alt="" />
        </div>
        <div className="col-4" onClick={() => setToggler(!toggler)}>
          <img src={img6} alt="" />
        </div>
        <div className="col-4" onClick={() => setToggler(!toggler)}>
          <img src={img7} alt="" />
        </div>
        <div className="col-4" onClick={() => setToggler(!toggler)}>
          <img src={img8} alt="" />
        </div>
      </div>
      <FsLightbox
        toggler={toggler}
        sources={[img1, img2, img3, img4, img5, img6, img7, img8]}
      />
    </div>
  );
};

export default Gallery;
