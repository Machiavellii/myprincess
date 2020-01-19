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

	const onCheckBoxServ = (e, service) => {
		if (services.indexOf(e.target.value) < 1 && e.target.checked) {
			services.push(service);
		}

		services.map((serv, i) => {
			if (!e.target.checked) {
				return e.target.value === serv ? services.splice(i, 1) : services;
			}
		});
	};

	const { canton, category, services } = formData;

	return (
		<div className='form-select'>
			<select
				className='form-control'
				onChange={e => onChange(e)}
				value={canton}
				name='canton'>
				<option value='0'> - Canton - </option>
				{cantonsList.map((item, index) => {
					return (
						<option key={index} value={item}>
							{item}
						</option>
					);
				})}
			</select>
			<select
				className='form-control'
				onChange={e => onChange(e)}
				value={category}
				name='category'>
				<option value='0'> - Category - </option>
				{categoryList.map((item, index) => {
					return (
						<option key={index} value={item}>
							{item}
						</option>
					);
				})}
			</select>
			<div className='dropdown'>
				<a
					className='nav-link dropdown-toggle form-control'
					href='#'
					role='button'
					id='dropdownMenuLink'
					data-toggle='dropdown'
					aria-haspopup='true'
					aria-expanded='false'>
					- Chooce wanted services -
				</a>
				<div
					className='dropdown-menu scrollable-menu'
					aria-labelledby='dropdownMenuButton'
					style={{ backgroundColor: 'white' }}>
					{servicesList.map((service, index) => {
						return (
							<li className='nav-item'>
								<input
									className='form-check-input ml-1'
									type='checkbox'
									id={service}
									value={service}
									name='services'
									onChange={e => onCheckBoxServ(e, service)}
								/>
								<label
									className='form-check-label dynamic-checkbox-label ml-4'
									htmlFor={service}>
									{service}
								</label>
							</li>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default connect(null, { filterSearchPage })(FilterForm);
