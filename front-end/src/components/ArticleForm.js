import React from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import axios from "axios"

export default function ArticleForm() {
	const SignupSchema = Yup.object().shape({
		articleBody: Yup.string().min(2, "trop court*").max(300, "Maximum 300 charactères*").required("obligatoire*"),
		articlePicture: Yup.mixed(),
		// .test("fileSize", "photo trop lourde", (value) => value === null || (value && value.size <= 2000000))
		// .test("fileType", "formats autorisés : jpg, jpeg, png", (value) => value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
		// .required("obligatoire*"),
	})

	function handleEditArticle(values) {
		// values.preventDefault()
		
		let articleBody = values.articleBody
		// let articlePicture = values.articlePicture

		
		console.log(values)

		axios
			.post("http://localhost:3002/articles", {
				articleBody
			})
			.then(() => console.log("Post créé"))
			.catch((err) => console.log(err))

		// window.location.reload()
	}

	return (
		<div className="card articleForm mb-5">
			<Formik
				initialValues={{
					articleBody: "",
					articlePicture: null,
				}}
				validationSchema={SignupSchema}
				onSubmit={(values) => {
					handleEditArticle(values)
					console.log(values.articleBody)
				}}
			>
				<Form>
					<Field name="articleBody" type="text-area" placeholder="Votre post" />
					<ErrorMessage name="articleBody" component="div" className="errorInput" />

					<Field name="articlePicture" type="file" accept=".jpg, .jpeg, .png" />
					<ErrorMessage name="articlePicture" component="div" className="errorInput" />

					<button type="submit" className="btn-lg btn-primary  mb-3 my-3">
						Envoyer
					</button>
				</Form>
			</Formik>
		</div>
	)
}
