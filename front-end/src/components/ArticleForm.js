import React, {useEffect, useState} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import axios from "axios"
import {ApiUrl} from "../variables-config"
import ProfilePicture from "./ProfilePicture"

export default function ArticleForm() {
	// const SignupSchema = Yup.object().shape({
	// 	articleBody: Yup.string().min(2, "trop court*").max(300, "Maximum 300 charactères*").required("obligatoire*"),
	// 	articlePicture: Yup.mixed()
	// 	.test("fileSize", "photo trop lourde", (value) => value === null || (value && value.size <= 2000000))
	// 	.test("fileType", "formats autorisés : jpg, jpeg, png", (value) => value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
	// 	.required("obligatoire*"),
	// })

	// set state of article
	const [article, setArticle] = useState({
		text: "",
		author: "robert",
		imageUrl: "",
	})

	//set state of welcome message text input
	const [placeHolderText, setplaceHolderText] = useState("Quoi de neuf")

	// personalize the welcome message text input with the user's name
	useEffect(() => {
		setplaceHolderText(`Quoi de neuf ${userName}`)
	}, [])
	let userName = "michel" //provisoire

	// set state of media input choice
	const [media, setMedia] = useState("")

	// submit the form and request
	function handleEditArticle(e) {
		console.log(e)
		console.log(article.author)

		axios
			.post(`${ApiUrl}/articles`, {
				// articleBody
				article,
			})
			.then(() => console.log("Post créé"))

		// window.location.reload()
	}

	// update state of article with input data
	function inputChangeHandler(e) {
		setArticle((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))
	}

	return (
		<div className="card row articleForm mb-5 p-3">
			<Formik
				initialValues={
					{
						// text: "",
						// author: "29",
						// imageUrl: undefined
						// articleAuthor: "Auteur inconnu"
					}
				}
				// validationSchema={SignupSchema}
				onSubmit={(e) => {
					handleEditArticle(e)
					console.log(e)
				}}
			>
				<Form>
					<div className="d-flex align-items-center justify-content-between mb-3">
						<ProfilePicture />
						{/* <Field name="articleBody" onChange={(e) => setArticleBody(e.target.value)} value={articleBody} type="text-area" placeholder="Votre post" /> */}
						<Field name="text" onChange={inputChangeHandler} value={article.text} type="textarea" placeholder={placeHolderText} className="textInput p-3" />
						<ErrorMessage name="articleBody" component="div" className="errorInput" />
					</div>

					{(() => {
						switch (media) {
							case "localImg":
								return (
									<div className="d-flex align-items-center flex-wrap">
										<span className="mb-3">Joindre une photo :</span>
										<div className="d-inline">
											<Field name="picture" type="file" accept=".jpg, .jpeg, .png" className="ytInput mb-3" />
											<ErrorMessage name="picture" component="div" className="errorInput" />
										</div>
										<button type="button" onClick={() => setMedia("youtube")} className="btn-sm btn-secondary mb-3">
											Ou joindre un lien Youtube
										</button>
									</div>
								)
							case "youtube":
								return (
									<div className="d-flex align-items-center flex-wrap">
										<span className="mb-3">lien youtube :</span>
										<div className="d-inline">
											<Field name="ytUrl" className="ytInput mb-3" />
											<ErrorMessage name="ytUrl" component="div" className="errorInput" />
										</div>
										<button type="button" onClick={() => setMedia("localImg")} className="btn-sm btn-secondary mb-3">
											Ou Joindre une image
										</button>
									</div>
								)
							default:
								return (
									<div className="d-flex flex-wrap">
										{/* <span className="w-100 mb-3">Souhaitez-vous joindre une photo ? Ou un lien youtube ?</span> */}
										<button type="button" onClick={() => setMedia("localImg")} className="btn btn-secondary mb-3 ">
											Joindre une photo personnelle ?
										</button>
										<button type="button" onClick={() => setMedia("youtube")} className="btn btn-secondary mb-3">
											Joindre un lien Youtube ?
										</button>
									</div>
								)
						}
					})()}

					<button type="submit" className="btn-lg btn-primary  mb-3">
						Envoyer
					</button>
				</Form>
			</Formik>
		</div>
	)
}
