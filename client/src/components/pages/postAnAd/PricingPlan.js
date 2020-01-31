import React from 'react';
import PricingCard from './PricingCard';

const PricingPlan = () => {
	return (
		<div className='container'>
			<div className='row justify-content-center p-3'>
				<div className='col-md-4 col-sm-12'>
					<PricingCard
						subscription_plan='30'
						days='30 days'
						price='90.00'
						currency='CHF'
						badge='THE MOST POPULAR'
						buttonStyle='full'
						amount={90}
					/>
				</div>

				<div className='col-md-4 col-sm-12 '>
					<PricingCard
						subscription_plan='90'
						days='90 days'
						price='240.00'
						currency='CHF'
						extra='Photo shoots offered'
						amount={240}
					/>
				</div>
			</div>
		</div>
	);
};

export default PricingPlan;
