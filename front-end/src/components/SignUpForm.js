import React from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"

export default function LoginForm() {
	const SignupSchema = Yup.object().shape({
		firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
		lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
		photo: Yup.mixed()
			.test("fileSize", "File Size is too large", (value) => value === null || (value && value.size <= 2000000))
			.test("fileType", "Unsupported File Format", (value) => value && ["image/jpg", "image/jpeg", "image/gif", "image/png"].includes(value.type))
			.required("required"),
	})

	return (
		<div>
			<h2>S'inscrire'</h2>
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
					<label htmlFor="firstName">Prénom</label>
					<Field name="firstName" type="text" placeholder="Marie" />
					<ErrorMessage name="firstName" />

					<label htmlFor="lastName">Nom</label>
					<Field name="lastName" type="text" placeholder="Dupont" />
					<ErrorMessage name="lastName" />

					<label htmlFor="email">Email</label>
					<Field name="email" type="email" placeholder="marie.dupont@gmail.com" />
					<ErrorMessage name="email" />

					<label htmlFor="photo">Photo de profil</label>
					<Field name="photo" type="file" accept=".jpg, .jpeg, .png" />

					<button type="submit">M'inscrire</button>
				</Form>
			</Formik>
		</div>
	)
}
