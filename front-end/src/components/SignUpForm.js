import React from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"

export default function LoginForm() {
	const SignupSchema = Yup.object().shape({
		firstName: Yup.string().min(2, "trop court*").max(50, "Trop long!").required("obligatoire*"),
		lastName: Yup.string().min(2, "trop court*").max(50, "Trop long!").required("obligatoire*"),
		email: Yup.string().email("adresse mail invalide").required("obligatoire*"),
		photo: Yup.mixed()
			.test("fileSize", "photo trop lourde", (value) => value === null || (value && value.size <= 2000000))
			.test("fileType", "formats autorisés : jpg, jpeg, png", (value) => value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
			.required("obligatoire*"),
	})

	return (
		<div className="log-signup">
			<h2>S'inscrire</h2>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					photo: null,
				}}
				validationSchema={SignupSchema}
				onSubmit={(values) => {
					// same shape as initial values
					console.log(values)
				}}
			>
				<Form>
					<Field name="firstName" type="text" placeholder="Prénom" />
					<ErrorMessage name="firstName" component="div" className="errorInput" />

					<Field name="lastName" type="text" placeholder="Nom" />
					<ErrorMessage name="lastName" component="div" className="errorInput" />

					<Field name="email" type="email" placeholder="adresse mail" />
					<ErrorMessage name="email" component="div" className="errorInput" />

					<Field name="photo" type="file" accept=".jpg, .jpeg, .png" />
					<ErrorMessage name="photo" component="div" className="errorInput" />

					<button type="submit" className="btn-lg btn-primary">
						Valider
					</button>
				</Form>
			</Formik>
		</div>
	)
}
