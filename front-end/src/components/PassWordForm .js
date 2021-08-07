import React, {useContext, useState} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// import utils
import {ApiUrl} from "../utils/variables-config"
// import user data
import {AuthContext} from "../App"
import { alertSuccessMessage } from "../utils/alertMessage"

export default function PassWordForm(props) {
	require("yup-password")(Yup) //update yup password librairie
	const {AuthState} = useContext(AuthContext) // use authentication global state
	const MySwal = withReactContent(Swal) // custom alert button
	const [errorMessage, setErrorMessage] = useState(null) // set error message from server

	// validate input values
	const passWordTest = Yup.string()
	.required("obligatoire*")
	.min(6, "trop court, 6 minimum*")
	.max(50, "trop long, 50 maximum*")
	.minLowercase(1, "minimum 1 lettre minuscule")
	.minUppercase(1, "minimum 1 lettre majuscule")
	.minNumbers(1, "minimum 1 chiffre")
	.minSymbols(1, "minimum 1 symbole")

	const ModifySchema = Yup.object().shape({
		oldPassword: passWordTest,
		password: passWordTest,
		passwordConfirm: passWordTest,
	})

	// send form data
	const handleFormSubmit = (values, resetForm) => {
		console.log(values) // A SUPP

		axios({
			method: "put",
			url: `${ApiUrl}/auth/password`,
			data: values,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		})
			.then((res) => {
				// if user modification well done, login with response data
				if (res.status === 200) {
					setErrorMessage(null)
					resetForm()
					props.setProfileRender(props.initialProfileRender)
					alertSuccessMessage("Mot de passe modifié", 2500)
				}
			})
			.catch((error) => {
				if (error.response) setErrorMessage(error.response.data)
			})
	}

	return (
		<div className="card shadow form-1 p-3 h-100 flex-column justify-content-center">
			<h3 className="text-center h4">Modifier mon mot de passe ?</h3>
			<Formik
				initialValues={{
					oldPassword: "",
					password: "",
					passwordConfirm: "",
				}}
				validationSchema={ModifySchema}
				onSubmit={(values, {resetForm}) => {
					// ask confirmation 
					MySwal.fire({
						title: "Confirmer l'envoi du nouveau mot de passe ?",
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
					<Field name="oldPassword" type="password" placeholder="Ancien mot de passe" />
					<ErrorMessage name="oldPassword" component="div" className="errorInput" />

					<Field name="password" type="password" placeholder="Nouveau mot de passe" />
					<ErrorMessage name="password" component="div" className="errorInput" />

					<Field name="passwordConfirm" type="password" placeholder="Confirmer le mot de passe" />
					<ErrorMessage name="passwordConfirm" component="div" className="errorInput" />

					<button type="submit" className="btn btn-primary" title="Modifier mot de passe" aria-label="Modifier mot de passe">
						Modifier le mot de passe
					</button>
					{errorMessage && <span className="errorInput mt-1 text-center ">{errorMessage}</span>}

					<button
						className="btn-sm btn--customize1"
						onClick={() => {
							props.setProfileRender(props.initialProfileRender)
						}}
					>
						Fermer
					</button>
				</Form>
			</Formik>
		</div>
	)
}
