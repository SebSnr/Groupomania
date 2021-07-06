import React, {useEffect, useState} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
// import * as Yup from "yup"
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
		youtubeUrl:"",
	})

	//state of welcome message text input
	const [placeHolderText, setplaceHolderText] = useState("Quoi de neuf ?")

	// personalize the welcome message text input with the user's name
	let userName = "michel" //provisoire
	useEffect(() => {setplaceHolderText(`Quoi de neuf ${userName} ?`)}, [userName])

	// state of media input choice
	const [media, setMedia] = useState("")

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState()


	// submit the form and request
	function handleEditArticle(e) {

		const formData = new FormData();
		formData.append("text", article.text)
		formData.append("author", article.author)
		formData.append("youtubeUrl", article.youtubeUrl)
		// formData.append("picture", selectedFile);
		
		console.log(formData)

		for (var pair of formData.entries()) {
			console.log(pair[0]+ ', ' + pair[1]); 
		}

		axios({
			method: "post",
			url: `${ApiUrl}/articles`,
			data: formData,
			headers: { "Content-Type": "multipart/form-data" },
		  })
			.then((res) => console.log("Post créé"))
	}

	// update state of article with input data
	function handleInputChange(e) {
		setArticle(() => ({
			...article,
			[e.target.name]: e.target.value,
		}))
		console.log(article)

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
				onSubmit={(values) => {
					handleEditArticle(values)
					console.log(values)
				}}
			>
				<Form>
					<div className="d-flex align-items-center justify-content-between mb-3">
						<ProfilePicture />
						<Field name="text" onChange={handleInputChange} value={article.text} type="textarea" placeholder={placeHolderText} className="textInput p-3" />
						<ErrorMessage name="text" component="div" className="errorInput" />
					</div>

					{(() => {
						switch (media) {
							case "localImg":
								return (
									<div className="d-flex align-items-center flex-wrap">
										<span className="mb-3">Joindre une photo :</span>
										<div className="d-inline">
											<Field name="picture" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept=".jpg, .jpeg, .png" className="ytInput mb-3" />
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
										<span className="mb-3">Lien youtube :</span>
										<div className="d-inline">
											<Field name="youtubeUrl" onChange={handleInputChange} value={article.youtubeUrl} placeholder="Votre lien Youtube" className="ytInput mb-3" />
											<ErrorMessage name="youtubeUrl" component="div" className="errorInput" />
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
