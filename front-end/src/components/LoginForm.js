import React, { useState, useContext } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { AuthContext } from "../App"
import axios from "axios"
import { ApiUrl } from "../variables-config"

export default function LoginForm() {

	// useContext
	const { dispatchAuthState } = useContext(AuthContext)

	// init the state user
	const initialUser = {
		email: "",
		password: "",
		isSubmitting: false,
		errorMessage: null
	}

	// state user
	const [user, setUser] = useState(initialUser)

	// set user state when input change
	const handleInputChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	// send form data when form submit
	const handleFormSubmit = (e) => {

		// set user state
		setUser({
			...user,
			isSubmitting: true,
			errorMessage: null,
		})

		console.log(user)

		axios({
			method: "post",
			url: `${ApiUrl}/auth/login`,
			data: user,
		})
			.then((res) => {

				console.log(res.data)

				// send db response and action to the global reducer
				dispatchAuthState({
					type: "LOGIN",
					payload: res.data,
				})

				setUser(initialUser)
				// window.location = ("/")

			})
			.catch(error => {
				setUser({
				  ...user,
				  isSubmitting: false,
				  errorMessage: error.message || error.statusText
				})
			})
	}
	

	return (
		<div className="log-signup">
			<h2>Se connecter</h2>
			<Formik
				initialValues={initialUser}
				// validate={(values) => {
				// 	const errors = {}
				// 	if (!values.email) {
				// 		errors.email = "obligatoire*"
				// 	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
				// 		errors.email = "adresse mail invalide*"
				// 	}
				// 	return errors
				// }}
				onSubmit={(values) => {
					handleFormSubmit(values)
				}}
			>
					<Form className="d-flex flex-column align-items-center">

						<Field name="email" type="email" onChange={handleInputChange} value={user.email} placeholder="adresse mail" />
						<ErrorMessage name="email" component="div" className="errorInput" />

						<Field name="password" type="password" onChange={handleInputChange} value={user.password} placeholder="mot de passe" />
						<ErrorMessage name="password" component="div" className="errorInput" />

						<button type="submit" className="btn-lg btn-primary" disabled={user.isSubmitting}>
							{user.isSubmitting ? ("Loading...") : ("Se connecter")}
							
						{/* screen the error message if login probleme */}
						{user.errorMessage && (
							<span className="form-error">{user.errorMessage}</span>
						)}
						</button>
					</Form>
			</Formik>
		</div>
	)
}
