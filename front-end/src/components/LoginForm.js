import React from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"

export default function LoginForm() {
	return (
		<div>
			<h2>Se connecter</h2>
			<Formik
				initialValues={{email: "", password: ""}}
				validate={(values) => {
					const errors = {}
					if (!values.email) {
						errors.email = "Required"
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = "Invalid email address"
					}
					return errors
				}}
				onSubmit={(values, {setSubmitting}) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2))
						setSubmitting(false)
					}, 400)
				}}
			>
				{({handleSubmit, isSubmitting}) => (
					<Form onSubmit={handleSubmit}>
						<label htmlFor="email">Email</label>
						<Field name="email" type="email" placeholder="" />
						<ErrorMessage name="email" />

						<label htmlFor="password">Mot de passe</label>
						<Field name="password" type="password" placeholder="" />
						<ErrorMessage name="password" />

						<button type="submit" disabled={isSubmitting}>Envoyer</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
