import React, {useEffect, useState, useContext} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
// Components
import ProfilePicture from "./ProfilePicture"
import {AuthContext} from "../App"
// Utils
import {ApiUrl} from "../utils/variables-config"

export default function CommentForm(props) {
	// use global state of authContext
	const {AuthState} = useContext(AuthContext)

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
					if (props.commentsRender % 2 === 0 ) props.setCommentsRender(0)
					props.setCommentsRefresh(true)
				} else {
					return res.status(401)
				}
			})
			.catch((err) => console.log(`Error post comment - ${err}`))
	}

	const validationSchema = Yup.object().shape({
		text: Yup.string().min(2, "").max(400, "trop long, max 400 charactères*").required("trop court, min 2 charactères*")
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
					<div className="d-flex align-items-center justify-content-between mb-3">
						<ProfilePicture photo={AuthState.photo} class="profile-picture--mini" />
						<div className="d-flex flex-grow-1">
							<Field name="text" type="textarea" placeholder="Écrivez votre commentaire" className="textInput px-3 py-1" />
							<button type="submit" className="btn-sm btn-primary mx-3" title="Envoyer les données" aria-label="Envoyer les données">
								Commenter
							</button>
						</div>
					</div>
						<ErrorMessage name="text" component="div" className="errorInput mx-5" />
				</Form>
			</Formik>
		</React.Fragment>
	)
}
