import React, {useState, useContext} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
// Components
import ProfilePicture from "./ProfilePicture"
import {AuthContext} from "../App"
// Utils
import {ApiUrl} from "../utils/variables-config"
import { alertErrorMessage } from "../utils/alertMessage"


export default function CommentForm(props) {

	const {AuthState} = useContext(AuthContext) // use global state of authContext
	const [errorMessage, setErrorMessage] = useState(null) // set error message


	// submit the form and request
	function handleFormSubmit(values, resetForm) {
		axios({
			method: "post",
			url: `${ApiUrl}/comments/${props.article.id}`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
			data: values,
		})
			.then((res) => {
				if (res.status === 200) {
					console.log("Commentaire créé") //ASUPP
					resetForm()
					props.setCommentsRefresh(true)
					if (props.commentsRender % 2 === 0) props.setCommentsRender(0)
				} else {
					return res.status(401)
				}
			})
			.catch((error) => {
				if (typeof error.response.data === "string") setErrorMessage(error.response.data)
				else alertErrorMessage("Erreur : impossible de poster votre commentaire. Veuillez retenter ultérieurement")
			})
	}

	const validationSchema = Yup.object().shape({
		text: Yup.string().min(2, "trop court, min 2 charactères*").max(400, "trop long, max 400 charactères*").required(""),
	})

	return (
		<React.Fragment>
			<Formik
				initialValues={{text: ""}}
				validationSchema={validationSchema}
				onSubmit={(values, {resetForm}) => {
					console.log(values) //ASUPP
					handleFormSubmit(values, resetForm)
				}}
			>
				<Form>
					<div className="mb-3">
						<div className="d-flex align-items-center justify-content-between">
							<ProfilePicture photo={AuthState.photo} class="profile-picture--mini" />
							<div className="d-flex flex-grow-1">
								<Field name="text" type="textarea" placeholder="Écrivez votre commentaire" className="textInput px-3 py-1" />
								<button type="submit" className="btn-sm btn-primary mx-3" title="Envoyer les données" aria-label="Envoyer les données">
									Commenter
								</button>
							</div>
						</div>
						{errorMessage ? <div className="errorInput mt-1 text-center">{errorMessage}</div> : <ErrorMessage name="text" component="div" className="errorInput mx-5" />}
					</div>
				</Form>
			</Formik>
		</React.Fragment>
	)
}
