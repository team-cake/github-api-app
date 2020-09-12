import React from 'react'
import { Formik } from 'formik'
import './dashboard.css'
import * as Yup from 'yup'
import { actions } from './actions'
import { connect } from 'react-redux'

class DashboardComponent extends React.Component {
	render() {
		return (
			<div>
				<Formik
					// accepts the initial object with the 'name' field that is empty
					initialValues={{ name: '' }}
					onSubmit={(values, { setSubmitting }) => {
						// after submitting disatches 'loadUserData' with entered username to saga
						// to trigger the API request
						this.props.loadUserData(values.name)
						setSubmitting(false)
					}}
					// validating the input which should be a text and required
					validationSchema={Yup.object().shape({
						name: Yup.string().required('Required'),
					})}
				>
					{/* // Passing Formik props to the DOM-form-elements */}
					{(props) => {
						const {
							values,
							touched,
							errors,
							dirty,
							isSubmitting,
							handleChange,
							handleBlur,
							handleSubmit,
							handleReset,
						} = props
						return (
							<form onSubmit={handleSubmit}>
								<label htmlFor='name'>
									<b>GitHub Name</b>
								</label>
								<input
									id='name'
									placeholder='Enter your Git username'
									type='text'
									value={values.name}
									onChange={handleChange}
									onBlur={handleBlur}
									// In case, if the user didn't input the data to the search field
									// then the border of the field would be red
									className={errors.name && touched.name ? 'error' : ''}
								/>
								{/* and the user will see the error message */}
								{errors.name && errors.touched && (
									<div className='input-feedback'>{errors.name}</div>
								)}
								{/* // By clicking on the "Reset" button the user will reset the
								form */}
								<button
									type='button'
									className='outline'
									onClick={handleReset}
									disabled={!dirty || isSubmitting}
								>
									Reset
								</button>
								{/* // by submitting will be awating for the requested user data */}
								<button type='submit' disabled={isSubmitting}>
									Submit
								</button>
							</form>
						)
					}}
				</Formik>
				{/* // the response from backend will be rendered in div-element and
				JSON-like format */}
				<div className='output'>
					<table class='table'>
						<thead>
							<tr>
								<th>GitHub User Data</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>{JSON.stringify(this.props.user, null, 2)}</th>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

// making the most current state of 'user' available as props in the component
const mapStateToProps = (state) => {
	return {
		user: state.user,
	}
}

// creating a function called 'loadUserData'
// that dispatches a 'LOAD_USER_DATA' action to the store
// so that saga can trigger and start the API request
const mapDispatchToProps = (dispatch) => {
	return {
		loadUserData: (name) => dispatch(actions.loadUserData(name)),
	}
}

// connect the Dashboard component and export it for use in <App />
export const Dashboard = connect(
	mapStateToProps,
	mapDispatchToProps
)(DashboardComponent)
