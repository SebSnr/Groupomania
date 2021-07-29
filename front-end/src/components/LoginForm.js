import React, {useContext, useState} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
import {useHistory} from "react-router-dom"

// import utils
import {ApiUrl} from "../utils/variables-config"
// import user data
import {AuthContext} from "../App"

export default function LoginForm() {
	require('yup-password')(Yup) //update yup password librairie

	let history = useHistory()

	// Validate input
	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email("mail invalide*")
			.test("@groupomania.com", "mail@groupomania.com*", (email) => email && email.indexOf("@groupomania.com", email.length - "@groupomania.com".length) !== -1)
			.required("obligatoire*"),
		password: Yup.string().required("obligatoire*").min(6, "trop court, 6 minimum*").max(50, "trop long, 50 maximum*").minLowercase(1, "minimum 1 lettre minuscule").minUppercase(1, "minimum 1 lettre majuscule").minNumbers(1, "minimum 1 chiffre").minSymbols(1, "minimum 1 symbole"),
	})

	// dispatch action and state of authentication
	const {dispatchAuthState} = useContext(AuthContext)

	// set error message from server
	const [errorMessage, setErrorMessage] = useState(null)

	// send form data
	const handleFormSubmit = (values, resetForm) => {
		axios({
			method: "post",
			url: `${ApiUrl}/auth/login`,
			data: values,
		})
			.then((res) => {
				console.log("Utilisateur trouvé") // A SUPP

				if (res.status === 200) {
					console.log(res.data) // A SUPP
					dispatchAuthState({
						type: "LOGIN",
						payload: res.data,
					})
					setErrorMessage(null)
					resetForm()
					history.push("/")
				}
			})
			.catch((error) => {if (error.response) setErrorMessage(error.response.data)})
	}

	return (
		<div className="form-1">
			<h2>Se connecter</h2>
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				validationSchema={LoginSchema}
				onSubmit={(values, {resetForm}) => {
					console.log(values)
					handleFormSubmit(values, resetForm)
				}}
			>
				{() => (
					<Form className="d-flex flex-column">
						<Field name="email" type="email" placeholder="adresse mail" />
						<ErrorMessage name="email" component="div" className="errorInput" />

						<Field name="password" type="password" placeholder="mot de passe" />
						<ErrorMessage name="password" component="div" className="errorInput" />

						<button type="submit" className="btn-lg btn-primary" title="Se connecter" aria-label="Se connecter">
							Se connecter
						</button>

						{errorMessage && (
							<div className="text-danger small text-center">
								<br />
								{errorMessage}
							</div>
						)}
					</Form>
				)}
			</Formik>
		</div>
	)
}
