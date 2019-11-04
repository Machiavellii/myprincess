import React from 'react';
import '../../styles/small-header.css';
import germany from '../../img/flag-icons/germany.png';
import france from '../../img/flag-icons/france.png';
import italy from '../../img/flag-icons/italy.png';
import romania from '../../img/flag-icons/romania.png';
import portugal from '../../img/flag-icons/portugal.png';
import russia from '../../img/flag-icons/russia.png';
import unitedkingdom from '../../img/flag-icons/united-kingdom.png';

// import { useTranslation } from 'react-i18next';

const MiniHeader = () => {
  // const { t, i18n } = useTranslation();

  const handleLanguage = lang => {
    // i18n.changeLanguage(lang);
  };

  return (
    <div className="small-header">
      <div className="language">
        <a href="#!" onClick={() => handleLanguage('en')}>
          <img src={unitedkingdom} alt="" />
        </a>
        <a href="#!" onClick={() => handleLanguage('fr')}>
          <img src={france} alt="" />
        </a>
        <a href="#!" onClick={() => handleLanguage('de')}>
          <img src={germany} alt="" />
        </a>
        <a href="#!">
          <img src={italy} alt="" />
        </a>
        <a href="#!">
          <img src={portugal} alt="" />
        </a>
        <a href="#!">
          <img src={unitedkingdom} alt="" />
        </a>
        <a href="#!">
          <img src={romania} alt="" />
        </a>
        <a href="#!">
          <img src={russia} alt="" />
        </a>
      </div>
    </div>
  );
};

export default MiniHeader;
