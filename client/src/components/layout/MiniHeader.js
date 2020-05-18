import React from "react";
import "../../styles/small-header.css";
import france from "../../img/flag-icons/france.png";
import unitedkingdom from "../../img/flag-icons/united-kingdom.png";

// import { useTranslation } from 'react-i18next';

const MiniHeader = () => {
  // const { t, i18n } = useTranslation();

  const handleLanguage = (lang) => {
    // i18n.changeLanguage(lang);
  };

  return (
    <div className="small-header">
      <div className="language">
        <a href="#!" onClick={() => handleLanguage("en")}>
          <img src={unitedkingdom} alt="" />
        </a>
        <a href="#!" onClick={() => handleLanguage("fr")}>
          <img src={france} alt="" />
        </a>
      </div>
    </div>
  );
};

export default MiniHeader;
