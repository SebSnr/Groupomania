import React, {useContext, useState} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// import utils
import {ApiUrl} from "../utils/variables-config"
// import components
import {AuthContext} from "../App"
import PassWordForm from "./PassWordForm "

export default function FormModifyProfile(props) {
	// use authentication global state
	const {AuthState, dispatchAuthState} = useContext(AuthContext)

	const MySwal = withReactContent(Swal) // custom alert button

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState()

	// set error message from server
	const [errorMessage, setErrorMessage] = useState(null)

	// validate input values
	const ValidationSchema = Yup.object().shape({
		firstName: Yup.string().min(2, "trop court*").max(50, "Trop long*"),
		lastName: Yup.string().min(2, "trop court*").max(50, "Trop long*"),
		password: Yup.string().min(4, "trop court*").max(50, "Trop long*"),
	})

	// send form data
	const handleFormSubmit = (values, resetForm) => {
		console.log(values) // A SUPP

		// if(!values && !selectedFile){
		// 	setErrorMessage("Veuillez remplir au moins 1 champs du formulaire")
		// 	return
		// }

		// set data object to send
		const formData = new FormData()
		for (let i in values) {
			if (!values[i]) {
			} else if (i === "password") formData.append(i, values[i])
			else if (i === "email") formData.append(i, values[i].toLowerCase())
			else formData.append(i, values[i].charAt(0).toUpperCase() + values[i].slice(1).toLowerCase())
		}

		// add file if exist and validated
		if (selectedFile && selectedFile.size < 2000000 && ["image/jpg", "image/jpeg", "image/png"].includes(selectedFile.type)) {
			formData.append("picture", selectedFile)
		} else if (selectedFile) {
			MySwal.fire({
				title: "Erreur de fichier. Non obligatoire. Sinon choisir un fichier au format .jpg .jpeg .png, max 3Mo",
				icon: "error",
				showCloseButton: false,
				buttonsStyling: false,
				customClass: {
					confirmButton: "btn btn-primary mx-3",
					title: "h4 font",
					popup: "card",
				},
			})
			return
		} else {
		}

		console.log(formData) // A SUPP

		axios({
			method: "put",
			url: `${ApiUrl}/auth/`,
			data: formData,
			headers: {"Authorization": `Bearer ${AuthState.token}`, "Content-Type": "multipart/form-data"},
		})
			.then((res) => {
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
				}
			})
			.catch((error) => {
				if (error.response) setErrorMessage(error.response.data)
			})
	}

	const handleDeleteAccount = () => {
		axios({
			method: "delete",
			url: `${ApiUrl}/auth`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		})
			.then((res) => {
				if (res.status === 200) {
					MySwal.fire({
						title: "Votre compte a bien été supprimé",
						icon: "success",
						timer: 1300,
						showConfirmButton: false,
						showCloseButton: false,
						buttonsStyling: false,
						customClass: {
							confirmButton: "btn btn-primary mx-3",
							cancelButton: "btn btn-danger mx-3",
							title: "h4 font",
							popup: "card",
						},
					})

					dispatchAuthState({
						type: "LOGOUT",
					})
				}
			})
			.catch(() => {
				alert("Erreur : impossible de supprimer votre compte. Veuillez contacter un admin")
			})
	}

	return (
		<div className="card shadow form-1 p-3 h-100 flex-column justify-content-center">
			<h3 className="text-center h4">Modifier mes informations ?</h3>

			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					photo: "",
				}}
				validationSchema={ValidationSchema}
				onSubmit={(values, {resetForm}) => {
					console.log(values)
					MySwal.fire({
						title: "Êtes-vous sûr de vouloir modifier ces informations ?",
						timer: 15000,
						showCancelButton: true,
						confirmButtonText: "Oui",
						cancelButtonText: "Non",
						buttonsStyling: false,
						customClass: {
							confirmButton: "btn btn-primary mx-3",
							cancelButton: "btn btn-danger mx-3",
							title: "h5 font",
							popup: "card",
						},
					}).then((result) => {
						if (result.isConfirmed) {
							handleFormSubmit(values, resetForm)
						} else return
					})
				}}
			>
				<Form className="d-flex flex-column align-items-center">
					<Field name="firstName" type="text" placeholder={`Prénom actuel : ${AuthState.firstName}`} />
					<ErrorMessage name="firstName" component="div" className="errorInput" />

					<Field name="lastName" type="text" placeholder={`Nom actuel : ${AuthState.lastName}`} />
					<ErrorMessage name="lastName" component="div" className="errorInput" />

					{/* <Field name="password" type="password" placeholder="Nouveau mot de passe" />
					<ErrorMessage name="password" component="div" className="errorInput" /> */}

					<Field name="picture" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept=".jpg, .jpeg, .png," className="file-input" />
					<ErrorMessage name="picture" component="div" className="errorInput" />

					<button
						type="submit"
						className="btn btn-primary"
						title="Modifier"
						aria-label="Modifier"
					>
						Modifier
					</button>
					{errorMessage ? (
						<span className="errorInput mt-1 text-center ">{errorMessage}</span>
					) : (
						<span className="errorInput mt-1 text-center ">Seuls les champs saisis seront modifiés</span>
					)}

					<button
						className="btn-sm btn-customize1"
						onClick={() => {
							props.setProfileRender(props.initialProfileRender)
						}}
					>
						Fermer
					</button>
					<button
						onClick={() => props.setProfileRender(<PassWordForm setProfileRender={props.setProfileRender} initialProfileRender={props.initialProfileRender} />)}
						className="btn btn-link"
					>
						Modifier le mot de passe ?
					</button>
				</Form>
			</Formik>
			<span className="mt-2 mb-3">ou</span>
			<button
				className="btn-sm btn-danger mt-0 mb-0"
				onClick={() => {
					MySwal.fire({
						icon: "warning",
						title: "Êtes-vous certain de vouloir supprimer votre compte définitivement ?",
						timer: 15000,
						showCancelButton: true,
						confirmButtonText: "Oui",
						cancelButtonText: "Non",
						buttonsStyling: false,
						customClass: {
							confirmButton: "btn btn-danger mx-3",
							cancelButton: "btn btn-primary mx-3",
							title: "h5 font",
							popup: "card",
						},
					}).then((result) => {
						if (result.isConfirmed) {
							handleDeleteAccount()
						} else return
					})
				}}
			>
				❌ Supprimer le compte ?
			</button>
		</div>
	)
}
