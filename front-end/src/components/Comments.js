import React, {useEffect, useState, useContext} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
// Components
import ProfilePicture from "./ProfilePicture"
import {AuthContext} from "../App"
// Utils
import {ApiUrl} from "../utils/variables-config"

export default function Comments() {
    // use global state of authContext
	const {AuthState} = useContext(AuthContext)



	const handleDoComment = () => {
		return null
	}

	return (
		<div>
			<div className="d-flex justify-content-evenly border-bottom border-secondary">
				<div>Like / dislike</div>
				<div>
					<button onClick={() => handleDoComment()} className="btn btn-link text-decoration-none text-secondary font-weight-bold">
						11 commentaires
					</button>
				</div>
			</div>
            <div className="form-2 mt-3">
            <Formik
				initialValues={{comment: ""}}
				// validationSchema={validationSchema}
				onSubmit={(values, {resetForm}) => {
					console.log(values) //ASUPP
					// handleFormSubmit(values, resetForm)
				}}
			>
				<Form>
					<div className="d-flex align-items-center justify-content-between mb-3">
						<ProfilePicture photo={AuthState.photo} class="profile-picture--mini" />
						<Field name="text" type="textarea" placeholder="Ecrivez votre commetaire" className="textInput px-3 py-1" />
						<ErrorMessage name="text" component="div" className="errorInput" />
					</div>
                </Form>
            </Formik>
            </div>

		</div>
	)
}
