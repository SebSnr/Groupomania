import React, {useEffect, useState, useContext} from "react"
import {Formik, Form, Field} from "formik"
import axios from "axios"
import {ApiUrl} from "../variables-config"
import ProfilePicture from "./ProfilePicture"
import {AuthContext} from "../App"

export default function ArticleForm() {
	// use global state of authContext
	const {AuthState} = useContext(AuthContext)

	// set state of article
	const initialArticle = {
		text: "",
		author: AuthState.user,
		picture: "",
		youtube: "",
	}

	const [article, setArticle] = useState(initialArticle)

	//state of welcome message text input
	const [placeHolderText, setPlaceHolderText] = useState("Quoi de neuf ?")

	// personalize the welcome message text input with user name
	useEffect(() => {
		setPlaceHolderText(`Quoi de neuf ${AuthState.firstName} ?`)
	}, [AuthState])

	// state of media input choice
	const [media, setMedia] = useState("")

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState() // supprimer selectedFile ?

	useEffect(() => {
		console.log(selectedFile)
	}, [selectedFile])

	// submit the form and request
	function handleEditArticle(e) {
		const formData = new FormData()
		formData.append("text", article.text)
		formData.append("author", article.author)
		formData.append("youtube", article.youtube)
		if (selectedFile) {
			formData.append("picture", selectedFile)
		}
		// selectedFile ? formData.append("picture", selectedFile) : return 0

		console.log(formData)

		for (var pair of formData.entries()) {
			console.log(pair[0] + ", " + pair[1])
		}

		// get user token by the local storage
		const token = JSON.parse(localStorage.getItem("token"))

		axios({
			method: "post",
			url: `${ApiUrl}/articles`,
			data: formData,
			headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`},
		})
			.then((res) => {
				setArticle(initialArticle)
				console.log("Post créé")
				window.location = "/"
			})
			.catch((err) => console.log(`Error post article - ${err}`))
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
				// initialValues={initialArticle}
				// validationSchema={SignupSchema}
				onSubmit={(values) => {
					handleEditArticle(values)
				}}
			>
				<Form>
					<div className="d-flex align-items-center justify-content-between mb-3">
						<ProfilePicture />
						<Field name="text" onChange={handleInputChange} value={article.text} type="textarea" placeholder={placeHolderText} className="textInput p-3 mb-3" />
					</div>

					{(() => {
						switch (media) {
							case "upload":
								return (
									<div className="d-flex align-items-center flex-wrap">
										<span className="mb-3">Joindre une photo : &nbsp;&nbsp;&nbsp;</span>
										<div className="d-inline">
											<Field name="picture" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept=".jpg, .jpeg, .png" className="mb-4 file-input" />
										</div>
										<button
											type="button"
											onClick={() => {
												setMedia("youtube")
												setSelectedFile()
											}}
											className="btn-sm btn-customize1 mb-3 mb-lg-3"
										>
											Ou joindre une vidéo Youtube ▶️
										</button>
									</div>
								)
							case "youtube":
								return (
									<div className="d-flex align-items-center flex-wrap">
										<span className="mb-3">Lien youtube :</span>
										<div className="d-inline">
											<Field name="youtube" onChange={handleInputChange} value={article.youtube} placeholder="Votre lien Youtube" className="ytInput mb-4" />
										</div>
										<button
											type="button"
											onClick={() => {
												setMedia("upload")
												setArticle(() => ({
													...article,
													"youtube": "",
												}))
											}}
											className="btn-sm btn-customize1 mb-3 mb-lg-3"
										>
											Ou joindre une photo 📷
										</button>
									</div>
								)
							default:
								return (
									<div className="d-flex flex-wrap">
										<button type="button" onClick={() => setMedia("upload")} className="btn btn-customize1 mb-4 mb-lg-4">
											Joindre une photo 📷
										</button>
										<button type="button" onClick={() => setMedia("youtube")} className="btn btn-customize1 mb-4 mb-lg-4">
											Joindre une vidéo Youtube ▶️
										</button>
									</div>
								)
						}
					})()}

					<button type="submit" className="btn-lg btn-primary my-3 mt-lg-0">
						Envoyer
					</button>
				</Form>
			</Formik>
		</div>
	)
}
