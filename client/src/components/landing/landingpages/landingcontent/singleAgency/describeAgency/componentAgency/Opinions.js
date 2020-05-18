import React, { useEffect } from 'react';
import Heart from '../../../../../../../img/heart.png';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getOpinions } from '../../../../../../../actions/opinions';

const Opinions = ({ agency, getOpinions, opinions: { opinions } }) => {
	useEffect(() => {
		getOpinions();
	}, [getOpinions]);

	// Total Stars
	const starsTotal = 5;

	return (
		<div className='opinions-holder my-3'>
			<div className='opinions mb-3'>
				<h1> Reviews</h1>
			</div>
			{opinions.map(opinion =>
				agency._id === opinion.agency ? (
					<div className='opinions-content px-2' key={opinion._id}>
						<div className='name'>
							<img src={Heart} alt='' />
							<p>{opinion.name}</p>
						</div>
						<div className='rating-text'>
							<h5 className='mb-3'>{opinion.title} </h5>
							<span>
								<span className='stars-outer mr-2'>
									<span
										className='stars-inner'
										style={{
											width: `${(opinion.review / starsTotal) * 100}%`
										}}></span>
								</span>
								<Moment format='LL' className='text-muted'>
									{opinion.date}
								</Moment>
							</span>
							<span>{opinion.text}</span>
						</div>
					</div>
				) : (
					''
				)
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	opinions: state.opinions
});

export default connect(mapStateToProps, { getOpinions })(Opinions);
