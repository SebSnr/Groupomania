import React, { useState, useContext } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { AuthContext } from "../App"
import axios from "axios"
import { ApiUrl } from "../variables-config"

export default function SignUpForm() {
	// validate input values
	const SignupSchema = Yup.object().shape({
		firstName: Yup.string().min(2, "trop court*").max(50, "Trop long*").required("obligatoire*"),
		lastName: Yup.string().min(2, "trop court*").max(50, "Trop long*").required("obligatoire*"),
		email: Yup.string().email("adresse mail invalide*").required("obligatoire*"),
		password: Yup.string().min(4, "trop court*").max(50, "Trop long*").required("obligatoire*"),
		// photo: Yup.mixed()
		// 	// .test("fileSize", "photo trop lourde", (value) => value === null || (value && value.size <= 2000000))
		// 	.test("fileType", "formats autorisés : jpg, jpeg, png", (value) => value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
		// 	.required("obligatoire*"),
	})

	// useContext
	const { dispatchAuthState } = useContext(AuthContext)

	// init the state user
	const initialUser = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		// photo: null,
		isSubmitting: false,
		errorMessage: null
	}

	


	// send form data when form submit
	const handleFormSubmit = (values) => {
		axios({
			method: "post",
			url: `${ApiUrl}/auth/signup`,
			data: values,
		})
			.then((res) => {

				console.log("Utilsateur créé")

				if (res.status === 200) {
					//now, log with user data
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
								payload: res.data,
							})
							window.location = ("/")
			
						})
						.catch(error => {console.log(error)})
				} else console.log("Error with signup then login")
			})
			.catch(error => {console.log(error)})
	}

	return (
		<div className="log-signup">
			<h2>S'inscrire</h2>
			<Formik
				initialValues={initialUser}
				validationSchema={SignupSchema}
				onSubmit={(values) => {
					console.log(values)
					handleFormSubmit(values)
				}}
			>
				<Form className="d-flex flex-column align-items-center">
					
					<Field name="firstName" type="text" placeholder="Prénom" />
					<ErrorMessage name="firstName" component="div" className="errorInput align-self-center" />

					<Field name="lastName" type="text" placeholder="Nom" />
					<ErrorMessage name="lastName" component="div" className="errorInput" />

					<Field name="email" type="email"placeholder="adresse mail" />
					<ErrorMessage name="email" component="div" className="errorInput" />

					<Field name="password" type="password"placeholder="mot de passe" />
					<ErrorMessage name="password" component="div" className="errorInput" />

					{/* <Field name="photo" type="file" onChange={handleInputChange} value={user.photo} accept=".jpg, .jpeg, .png" />
					<ErrorMessage name="photo" component="div" className="errorInput" /> */}

					<button type="submit" className="btn-lg btn-primary" >s'inscrire</button>
				</Form>
			</Formik>
		</div>
	)
}
