import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addOpinion } from '../../../../../../../actions/opinions';

const View = ({ auth: { isAuthenticated }, agency, addOpinion }) => {
	const { _id } = agency;
	const [formData, setFormData] = useState({
		title: '',
		text: '',
		review: ''
	});

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onClick = e => {
		setFormData({ ...formData, review: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();

		addOpinion(formData, _id);

		setFormData({ title: '', text: '', review: '' });
	};

	return (
		<Fragment>
			{isAuthenticated ? (
				<div className='view-holder' id='viewHolder'>
					<p>view</p>
					<form onSubmit={e => onSubmit(e)}>
						<div className='form-group'>
							<span>Review title *</span>
							<input
								type='text'
								name='title'
								className='form-control form-control-lg'
								placeholder='Resumez votre avis ou mettez en evidence un detail important'
								onChange={onChange}
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='' style={{ display: 'block' }}>
								Write your review below *
							</label>
							<textarea
								name='text'
								id=''
								rows='8'
								className='form-control form-control-lg'
								placeholder='Par respect, seuls les avis positifs et respectueux seront publices'
								onChange={onChange}></textarea>
						</div>
						{/* <div className="form-group">
          <input type="checkbox" name="" id="" />{" "}
          <label className="input-label">
            Remember my name, my email and my website in the browser for my next
            comment.
          </label>
        </div> */}

						<div className='form-group'>
							<div className='starsMain mb-2'>
								<div className='stars-holder'>
									<input
										type='radio'
										name='review'
										value='5'
										id='star5'
										onClick={onClick}
									/>{' '}
									<label htmlFor='star5'></label>
									<input
										type='radio'
										name='review'
										value='4'
										id='star4'
										onClick={onClick}
									/>{' '}
									<label htmlFor='star4' className='ml-2'></label>
									<input
										type='radio'
										name='review'
										value='3'
										id='star3'
										onClick={onClick}
									/>{' '}
									<label htmlFor='star3' className='ml-2'></label>
									<input
										type='radio'
										name='review'
										value='2'
										id='star2'
										onClick={onClick}
									/>{' '}
									<label htmlFor='star2' className='ml-2'></label>
									<input
										type='radio'
										name='review'
										value='1'
										id='star1'
										onClick={onClick}
									/>{' '}
									<label htmlFor='star1' className='ml-2'></label>
								</div>
							</div>

							{/* <div className="stars-outer">
            <span>Overall rating out of 5 stars *</span>
            <span className="stars-inner"></span>
          </div> */}
						</div>

						<input
							type='submit'
							value='Send my opinion'
							className='btn btn-rose'
						/>
					</form>
				</div>
			) : (
				''
			)}
		</Fragment>
	);
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addOpinion })(View);
