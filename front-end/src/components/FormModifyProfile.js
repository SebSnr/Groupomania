import React, {useContext, useState} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
// import utils
import {ApiUrl} from "../utils/variables-config"
// import user data
import {AuthContext} from "../App"

export default function FormModifyProfile(props) {
	// get user token by the local storage
	const token = JSON.parse(localStorage.getItem("token"))

	// use authentication global state
	const {AuthState, dispatchAuthState} = useContext(AuthContext)
	// const {AuthState} = useContext(AuthContext)

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState()

	// set error message from server
	const [errorMessage, setErrorMessage] = useState(null)

	// validate input values
	const ModifySchema = Yup.object().shape({
		firstName: Yup.string().min(2, "trop court*").max(50, "Trop long*"),
		lastName: Yup.string().min(2, "trop court*").max(50, "Trop long*"),
		email: Yup.string().email("adresse mail invalide*"),
		password: Yup.string().min(4, "trop court*").max(50, "Trop long*"),
		// photo: Yup.mixed()
		// 	// .test("fileSize", "photo trop lourde", (value) => value === null || (value && value.size <= 2000000))
		// 	.test("fileType", "formats autorisés : jpg, jpeg, png", (value) => value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
		// 	.required("obligatoire*"),
	})

	// send form data
	const handleFormSubmit = (values, resetForm) => {
		console.log(values) // A SUPP

		if (window.confirm("Êtes-vous sûr de vouloir modifier ces informations ?")) {
		} else return

		// set data object to send
		const formData = new FormData()
		// for (let i in values) {
		// 	formData.append(i, values[i])
		// }
		for (let i in values) {
			if (!values[i]) {
				console.log(values[i])
			} else {
				formData.append(i, values[i])
			}
		}

		// add file if exist and validated
		// add file if exist and validated
		if (selectedFile && selectedFile.size < 2000000 && ["image/jpg", "image/jpeg", "image/png"].includes(selectedFile.type)) {
			formData.append("picture", selectedFile)
		} else if(selectedFile) {
			alert("Erreur de fichier. Non obligatoire. Sinon choisir un fichier au format .jpg .jpeg .png, max 3Mo")
			return
		} else { }

		console.log(formData) // A SUPP

		axios({
			method: "put",
			url: `${ApiUrl}/auth/`,
			data: formData,
			headers: {"Authorization": `Bearer ${token}`, "Content-Type": "multipart/form-data"},
		}).then((res) => {
			console.log("User has been modified") // A SUPP
			// if user modification well done, login with response data
			if (res.status === 200) {
				console.log(res.data) // A SUPP
				dispatchAuthState({
					type: "LOGIN",
					payload: res.data,
				})
				setErrorMessage(null)
				resetForm()
			} else console.log("Error with modify then login")
		})
		// .catch((error) => {
		// 	if (error.response) setErrorMessage(error.response.data)
		// })
	}

	const handleDeleteAccount = () => {
		axios({
			method: "delete",
			url: `${ApiUrl}/auth`,
			headers: {"Authorization": `Bearer ${token}`},
		})
			.then((res) => {
				if (res.status === 200) {
					dispatchAuthState({
						type: "LOGOUT",
					})
					alert("Votre compte a bien été supprimé")
				}
			})
			.catch((error) => {
				alert("Impossible de supprimer votre compte. Veuillez contacter un admin")
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
					photo: "",
				}}
				validationSchema={ModifySchema}
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

					<Field name="email" type="email" placeholder="Nouveau mail" />
					<ErrorMessage name="email" component="div" className="errorInput" />

					<Field name="password" type="password" placeholder="Nouveau mot de passe" />
					<ErrorMessage name="password" component="div" className="errorInput" />

					<Field name="picture" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept=".jpg, .jpeg, .png," />
					<ErrorMessage name="picture" component="div" className="errorInput" />

					<button type="submit" className="btn btn-primary" title="Modifier" aria-label="Modifier">
						Modifier
					</button>
					<span className="errorInput mt-1 text-center ">Seuls les champs saisis seront modifiés</span>
					{errorMessage && (
						<div className="text-danger small">
							<br />
							{errorMessage}
						</div>
					)}

					<button
						className="btn-sm btn-customize1"
						onClick={() => {
							props.setProfileRender(props.initialProfileRender)
						}}
					>
						Retour
					</button>
				</Form>
			</Formik>
			<span className="mt-4 mb-2">ou</span>
			<button
				className="btn-sm btn-danger mt-0 mb-0"
				onClick={() => {
					if (window.confirm("❌ Êtes-vous certain de vouloir supprimer votre compte ?")) {
						handleDeleteAccount()
					}
				}}
			>
				❌ Supprimer le compte ?
			</button>
		</div>
	)
}
