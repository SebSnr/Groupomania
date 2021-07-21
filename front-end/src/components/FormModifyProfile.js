import React, {useContext, useState} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
// import utils
import {ApiUrl} from "../utils/variables-config"
// import user data
import {AuthContext} from "../App"

export default function FormModifyProfile() {
	// use authentication global state
	const {dispatchAuthState} = useContext(AuthContext)

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState()

	// set error message from server
	const [errorMessage, setErrorMessage] = useState(null)

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

	// send form data
	const handleFormSubmit = (values, resetForm) => {
		console.log(values) // A SUPP

		// set data object to send
		const formData = new FormData()
		for (let i in values) {
			formData.append(i, values[i])
		}
		if (selectedFile && selectedFile.size > 10) {
			formData.append("picture", selectedFile)
		}

		console.log(formData) // A SUPP

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
					axios({
						method: "post",
						url: `${ApiUrl}/auth/login`,
						data: values,
					})
						.then((res) => {
							console.log(res.data) // A SUPP
							dispatchAuthState({
								type: "LOGIN",
								payload: res.data,
							})
							setErrorMessage(null)
							resetForm()
							window.location = "/"
						})
						.catch((error) => {
							console.log(error)
						})
				} else console.log("Error with signup then login")
			})
			.catch((error) => {
				if (error.response) setErrorMessage(error.response.data)
				console.log(error) // A SUPP
			})
	}

	return (
		<div className="card shadow form-1 p-3 h-100 flex-column justify-content-center">
			<h3 className="text-center h4">Modifier mes informations ?</h3>

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
				<Form className="d-flex flex-column align-items-center">
					<Field name="firstName" type="text" placeholder="Nouveau prénom" />
					<ErrorMessage name="firstName" component="div" className="errorInput" />

					<Field name="lastName" type="text" placeholder="Nouveau nom" />
					<ErrorMessage name="lastName" component="div" className="errorInput" />

					<Field name="email" type="email" placeholder="Nouvelle adresse mail" />
					<ErrorMessage name="email" component="div" className="errorInput" />

					<Field name="password" type="password" placeholder="mot de passe" />
					<ErrorMessage name="password" component="div" className="errorInput" />

					{/* <Field name="photo" type="file" accept=".jpg, .jpeg, .png" />
					<ErrorMessage name="photo" component="div" className="errorInput" /> */}

					{/* <Field name="picture" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept=".jpg, .jpeg, .png," />
					<ErrorMessage name="picture" component="div" className="errorInput" /> */}

					<button type="submit" className="btn btn-primary" title="S'inscrire" aria-label="S'inscrire">
						Modifier
					</button>
					<span className="errorInput mt-1 text-center " >Seuls les champs saisis seront modifiés</span>


					<button
						className="btn-sm btn-customize1" 
						onClick={() => {
							if (window.confirm("Se déconnecter ?")) {
								console.log("c'est en bonne voie ")
							}
						}}
					>
						Retour
					</button>

					{errorMessage && (
						<div className="text-danger small">
							<br />
							{errorMessage}
						</div>
					)}
				</Form>
			</Formik>
			<span className="mt-4 mb-2">ou</span>
			<button
				className="btn-sm btn-danger mt-0 mb-0"
				onClick={() => {
					if (window.confirm("Se déconnecter ?")) {
						console.log("c'est en bonne voie ")
					}
				}}
			>
				❌ Supprimer le compte ?{" "}
			</button>
		</div>
	)
}
