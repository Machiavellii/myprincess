import React, { useState, useEffect } from 'react';
import { categoryList, servicesList } from '../../../constants/data.json';
import { connect } from 'react-redux';
import { filterSearchPage } from '../../../actions/profile';

const FilterForm = ({ filterSearchPage, profiles: { profiles } }) => {
  const [formData, setFormData] = useState({
    canton: '',
    services: [],
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

  // const onCheckBoxServ = (e, service) => {
  //   if (services.indexOf(e.target.value) < 1 && e.target.checked) {
  //     services.push(service);
  //   }

  //   services.map((serv, i) => {
  //     if (!e.target.checked) {
  //       return e.target.value === serv ? services.splice(i, 1) : services;
  //     }
  //   });
  // };

  const { canton, category, services } = formData;

  const cantons = [
    ...new Set(profiles.map(profile => profile.location.canton))
  ];

  console.log(profiles);

  const getNumbOfGirls = canton => {
    var numbOfGirls = 0;

    for (var i = 0; i < profiles.length; i++) {
      if ('location' in profiles[i] && profiles[i].location.canton === canton)
        numbOfGirls++;
    }

    return numbOfGirls;
  };

  // console.log(profiles);

  return (
    <div className="form-select">
      <select
        className="form-control"
        onChange={e => onChange(e)}
        value={canton}
        name="canton"
        multiple={false}
      >
        <option value="0"> - Canton - </option>{' '}
        {cantons.map((canton, index) => {
          return (
            <option key={index} value={canton ? canton : 'No canton'}>
              {canton ? canton + ` (${getNumbOfGirls(canton)})` : 'No canton'}
            </option>
          );
        })}
      </select>
      <select
        className="form-control"
        onChange={e => onChange(e)}
        value={category}
        name="category"
        multiple={false}
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
        multiple={false}
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

export default connect(null, { filterSearchPage })(FilterForm);
