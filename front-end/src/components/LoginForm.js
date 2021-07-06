import React, { useState, useContext } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

// pour authentifier
import { AuthContext } from "../App"
import axios from "axios"
import { ApiUrl } from "../variables-config"

export default function LoginForm() {

	// useContext
	const { dispatch } = useContext(AuthContext)

	const initialState = {
		email: "",
		password: "",
		isSubmitting: false,
		errorMessage: null
	}

	const [user, setUser] = useState(initialState)

	const handleInputChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const handleFormSubmit = (e) => {

		// set state of user
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
				// console.log(res.user)})
				dispatch({
					type: "LOGIN",
					payload: res.data
				})
				window.location = ("/")

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
				initialValues={initialState}
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

						{/* screen the error message if login probleme */}
						{user.errorMessage && (
							<span className="form-error">{user.errorMessage}</span>
						)}

						<button type="submit" className="btn-lg btn-primary" disabled={user.isSubmitting}>
							{user.isSubmitting ? ("Loading...") : ("Se connecter")}
						</button>
					</Form>
			</Formik>
		</div>
	)
}
