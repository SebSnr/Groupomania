import React, {useContext, useState} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
// import utils
import {ApiUrl} from "../utils/variables-config"
// import user data
import {AuthContext} from "../App"

export default function LoginForm() {
	// Validate input
	const LoginSchema = Yup.object().shape({
		email: Yup.string().email("adresse mail invalide*").required("email valide obligatoire*"),
		password: Yup.string().min(2, "trop court*").max(50, "Trop long*").required("obligatoire*"),
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
					window.location = "/"
				}
			})
			.catch((error) => {
				if (error.response) setErrorMessage(error.response.data)
			})
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
							<div className="text-danger small">
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
