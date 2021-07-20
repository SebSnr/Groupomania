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

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState()

	// useContext
	const { dispatchAuthState } = useContext(AuthContext)

	// set error message from server
	const [errorMessage, setErrorMessage] = useState(null)

	// send form data when form submit
	const handleFormSubmit = (values, resetForm) => {

		console.log(values)

		const formData = new FormData()
		for (let i in values){
			formData.append(i, values[i])
		}
		if (selectedFile) {
			formData.append("picture", selectedFile)
		}

		
		console.log(formData)

		axios({
			method: "post",
			url: `${ApiUrl}/auth/signup`,
			headers: {"Content-Type": "multipart/form-data"},
			data: formData,
		})
			.then((res) => {

				console.log("L'utilisateur a été créé")

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

							setErrorMessage (null)
							resetForm()
							window.location = ("/")
			
						})
						.catch(error => {console.log(error)})
				} else console.log("Error with signup then login")
			})
			.catch(error => {
				if (error.response) setErrorMessage (error.response.data)
				console.log(error)
			})
	}

	return (
		<div className="log-signup">
			<h2>S'inscrire</h2>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					// photo: "",
				}}
				validationSchema={SignupSchema}
				onSubmit={(values, {resetForm}) => {
					console.log(values)
					handleFormSubmit(values, resetForm)
				}}
				
			>
				<Form className="d-flex flex-column">
					
					<Field name="firstName" type="text" placeholder="Prénom" />
					<ErrorMessage name="firstName" component="div" className="errorInput" />

					<Field name="lastName" type="text" placeholder="Nom" />
					<ErrorMessage name="lastName" component="div" className="errorInput" />

					<Field name="email" type="email" placeholder="adresse mail" />
					<ErrorMessage name="email" component="div" className="errorInput" />

					<Field name="password" type="password" placeholder="mot de passe" />
					<ErrorMessage name="password" component="div" className="errorInput" />

					{/* <Field name="photo" type="file" accept=".jpg, .jpeg, .png" />
					<ErrorMessage name="photo" component="div" className="errorInput" /> */}

					<Field name="picture" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept=".jpg, .jpeg, .png," />


					<button type="submit" className="btn-lg btn-primary" title="S'inscrire" aria-label="S'inscrire" >s'inscrire</button>

					{errorMessage && <div className= "text-danger small"><br></br>{errorMessage}</div>}

				</Form>
			</Formik>
		</div>
	)
}
