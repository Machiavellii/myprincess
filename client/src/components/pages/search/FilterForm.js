import React, { useState, useEffect } from 'react';
import {
  categoryList,
  servicesList,
  cantonsList
} from '../../../constants/data.json';
import { connect } from 'react-redux';
import { filterSearchPage } from '../../../actions/profile';

const FilterForm = ({ filterSearchPage }) => {
  const [formData, setFormData] = useState({
    canton: '',
    services: '',
    category: ''
  });

  useEffect(() => {
    filterSearchPage(formData);
  }, [formData, filterSearchPage]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // setFormData(e.target.value);
    // filterSearchPage(e.target.value);
  };
  const { canton, category, services } = formData;

  return (
    <div className="form-select">
      <select
        className="form-control"
        onChange={e => onChange(e)}
        value={canton}
        name="canton"
      >
        <option value="0"> - Canton - </option>
        {cantonsList.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <select
        className="form-control"
        onChange={e => onChange(e)}
        value={category}
        name="category"
      >
        <option value="0"> - Category - </option>
        {categoryList.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <select
        className="form-control"
        name="services"
        onChange={e => onChange(e)}
        value={services}
      >
        <option value="0"> - Prestations - </option>
        {servicesList.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default connect(
  null,
  { filterSearchPage }
)(FilterForm);
