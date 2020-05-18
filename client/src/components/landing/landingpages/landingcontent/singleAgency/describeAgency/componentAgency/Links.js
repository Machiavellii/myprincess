import React from 'react';

const Links = ({ agency }) => {
	const { services } = agency;
	return (
		<div className='list-holder'>
			{services.map((service, i) => (
				<div className='first-list' key={i}>
					<li>
						<a href='!#'>
							<i className='fas fa-check'></i>
							{service}
						</a>
					</li>
				</div>
			))}
		</div>
	);
};

export default Links;
