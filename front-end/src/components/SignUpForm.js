import React, { useState, useContext } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

// pour authentifier
import { AuthContext } from "../App"
import axios from "axios"
import { ApiUrl } from "../variables-config"



export default function LoginForm() {
	// validate input values
	const SignupSchema = Yup.object().shape({
		firstName: Yup.string().min(2, "trop court*").max(50, "Trop long!").required("obligatoire*"),
		lastName: Yup.string().min(2, "trop court*").max(50, "Trop long!").required("obligatoire*"),
		email: Yup.string().email("adresse mail invalide").required("obligatoire*"),
		photo: Yup.mixed()
			// .test("fileSize", "photo trop lourde", (value) => value === null || (value && value.size <= 2000000))
			.test("fileType", "formats autorisés : jpg, jpeg, png", (value) => value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
			.required("obligatoire*"),
	})

	// useContext
	const { dispatch } = useContext(AuthContext)
	const initialState = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		// photo: null,
		// isAdmin: false,
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

		// to disable t
		setUser({
			...user,
			isSubmitting: true,
			errorMessage: null,
		})

		console.log(user)

		axios({
			method: "post",
			url: `${ApiUrl}/users`,
			body: user,
		})
			.then((res) => {
				// console.log("Utilsateur créé")})
				dispatch({
					type: "LOGIN",
					payload: res
				})
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
			<h2>S'inscrire</h2>
			<Formik
				initialValues={initialState}
				// validationSchema={SignupSchema}
				onSubmit={(values) => {
					handleFormSubmit(values)
				}}
			>
				<Form className="d-flex flex-column align-items-center">
					
					<Field name="firstName" type="text" onChange={handleInputChange} value={user.firstName} placeholder="Prénom" />
					<ErrorMessage name="firstName" component="div" className="errorInput align-self-center" />

					<Field name="lastName" type="text" onChange={handleInputChange} value={user.lastName} placeholder="Nom" />
					<ErrorMessage name="lastName" component="div" className="errorInput" />

					<Field name="email" type="email" onChange={handleInputChange} value={user.email} placeholder="adresse mail" />
					<ErrorMessage name="email" component="div" className="errorInput" />

					<Field name="password" type="password" onChange={handleInputChange} value={user.password} placeholder="mot de passe" />
					<ErrorMessage name="password" component="div" className="errorInput" />

					{/* <Field name="photo" type="file" onChange={handleInputChange} value={user.photo} accept=".jpg, .jpeg, .png" />
					<ErrorMessage name="photo" component="div" className="errorInput" /> */}

					{/* screen the error message if sign-up probleme */}
					{user.errorMessage && (
						<span className="form-error">{user.errorMessage}</span>
					)}

					<button type="submit" className="btn-lg btn-primary" disabled={user.isSubmitting}>
						{user.isSubmitting ? ("Loading...") : ("S'incrire")}
					</button>
				</Form>
			</Formik>
		</div>
	)
}
