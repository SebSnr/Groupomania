import React from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"

export default function LoginForm() {
	return (
		<div className="log-signup">
			<h2>Se connecter</h2>
			<Formik
				initialValues={{email: "", password: ""}}
				validate={(values) => {
					const errors = {}
					if (!values.email) {
						errors.email = "obligatoire*"
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = "adresse mail invalide*"
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
						<Field name="email" type="email" placeholder="Mail" />
						<ErrorMessage name="email" component="div" className="errorInput" />

						<Field name="password" type="password" placeholder="Mot de passe" />
						<ErrorMessage name="password" component="div" className="errorInput" />

						<button type="submit" disabled={isSubmitting}>
							Envoyer
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
