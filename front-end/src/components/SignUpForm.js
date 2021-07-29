import React, {useContext, useState} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import {useHistory} from "react-router-dom"
import axios from "axios"
import * as Yup from "yup"
// import utils
import {ApiUrl} from "../utils/variables-config"
// import user data
import {AuthContext} from "../App"

export default function SignUpForm() {
	require('yup-password')(Yup) //update yup password librairie
	let history = useHistory()

	// use authentication global state
	const {dispatchAuthState} = useContext(AuthContext)

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState()

	// set error message from server
	const [errorMessage, setErrorMessage] = useState(null)

	// validate input values
	const SignupSchema = Yup.object().shape({
		firstName: Yup.string().min(2, "trop court*").max(50, "trop long*").required("obligatoire*"),
		lastName: Yup.string().min(2, "trop court*").max(50, "trop long*").required("obligatoire*"),
		email: Yup.string()
			.email("mail invalide*")
			.test("@groupomania.com", "mail@groupomania.com*", (email) => email && email.indexOf("@groupomania.com", email.length - "@groupomania.com".length) !== -1)
			.required("obligatoire*"),
		password: Yup.string().required("obligatoire*").min(6, "trop court, 6 minimum*").max(50, "trop long, 50 maximum*").minLowercase(1, "minimum 1 lettre minuscule").minUppercase(1, "minimum 1 lettre majuscule").minNumbers(1, "minimum 1 chiffre").minSymbols(1, "minimum 1 symbole"),

	})

	// send form data
	const handleFormSubmit = (values, resetForm) => {
		console.log(values) // A SUPP

		// set data object to send
		const formData = new FormData()
		for (let i in values) {
			if (i === "password") formData.append(i, values[i])
			else if (i === "email") formData.append(i, values[i].toLowerCase())
			else formData.append(i, values[i].charAt(0).toUpperCase() + values[i].slice(1).toLowerCase()) 
		}
		// add file if exist and validated
		if (selectedFile && selectedFile.size < 2000000 && ["image/jpg", "image/jpeg", "image/png"].includes(selectedFile.type)) {
			formData.append("picture", selectedFile)
		} else if (selectedFile) {
			alert("Erreur de fichier. Non obligatoire. Sinon choisir un fichier au format .jpg .jpeg .png, max 3Mo")
			return
		} else {
		}

		axios({
			method: "post",
			url: `${ApiUrl}/auth/signup`,
			headers: {"Content-Type": "multipart/form-data"},
			data: formData,
		})
			.then((res) => {
				console.log("L'utilisateur a été créé") // A SUPP

				// if user creation well done, send request to log
				if (res.status === 200) {
					dispatchAuthState({
						type: "LOGIN",
						payload: res.data,
					})
					console.log(res.data) // A SUPP
					setErrorMessage(null)
					resetForm()
					history.push("/")
				}
			})
			.catch((error) => {if (error.response) setErrorMessage(error.response.data)})

	}

	return (
		<div className="form-1">
			<h2>S'inscrire</h2>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					password: "",
				}}
				validationSchema={SignupSchema}
				onSubmit={(values, {resetForm}) => {
					console.log(values) //ASUPP
					handleFormSubmit(values, resetForm)
				}}
			>
				<Form className="d-flex flex-column">
					<Field name="firstName" type="text" placeholder="prenom" />
					<ErrorMessage name="firstName" component="div" className="errorInput" />

					<Field name="lastName" type="text" placeholder="nom" />
					<ErrorMessage name="lastName" component="div" className="errorInput" />

					<Field name="email" type="email" placeholder="mail Groupomania" />
					<ErrorMessage name="email" component="div" className="errorInput" />

					<Field name="password" type="password" placeholder="mot de passe" />
					<ErrorMessage name="password" component="div" className="errorInput" />

					<Field name="picture" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept=".jpg, .jpeg, .png," />
					<ErrorMessage name="picture" component="div" className="errorInput" />

					<button type="submit" className="btn-lg btn-primary" title="S'inscrire" aria-label="S'inscrire">
						s'inscrire
					</button>

					{errorMessage && (
						<div className="text-danger small text-center">
							<br />
							{errorMessage}
						</div>
					)}
				</Form>
			</Formik>
		</div>
	)
}
