import React, { useContext } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { AuthContext } from "../App"
import axios from "axios"
import * as Yup from "yup"
import { ApiUrl } from "../variables-config"

export default function LoginForm() {

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email("adresse mail invalide*").required("email valide obligatoire*"),
		password: Yup.string().min(2, "trop court*").max(50, "Trop long*").required("obligatoire*"),
	})

	// dispatch action and state of authenfication context
	const { dispatchAuthState } = useContext(AuthContext)

	// init the state user
	const initialUser = {
		email: "",
		password: "",
		isSubmitting: false,
		errorMessage: null
	}

	// send form data when form submit
	const handleFormSubmit = (values) => {

		axios({
			method: "post",
			url: `${ApiUrl}/auth/login`,
			data: values,
		})
			.then((res) => {

				console.log(res.data)

				// send db response and action to the global reducer
				dispatchAuthState({
					type: "LOGIN",
					payload : res.data,
				})

				// window.location = ("/")

			})
			.catch(error => {console.log(error)})

	}
	

	return (
		<div className="log-signup">
			<h2>Se connecter</h2>
			<Formik
				initialValues= {initialUser}
				validationSchema= {LoginSchema}
				onSubmit= {(values) => {
					handleFormSubmit(values)
					console.log(values)
				}}
			>
					<Form className="d-flex flex-column">

						<Field name="email" type="email" placeholder="adresse mail" />
						<ErrorMessage name="email" component="div" className="errorInput" />

						<Field name="password" type="password" placeholder="mot de passe" />
						<ErrorMessage name="password" component="div" className="errorInput" />

						<button type="submit" className="btn-lg btn-primary">Se connecter</button>
					</Form>
			</Formik>
		</div>
	)
}
