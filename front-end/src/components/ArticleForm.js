import React, {useEffect, useState, useContext} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
// import * as Yup from "yup"
import axios from "axios"
import {ApiUrl} from "../variables-config"
import ProfilePicture from "./ProfilePicture"
import { AuthContext } from "../App"


export default function ArticleForm() {
	// const SignupSchema = Yup.object().shape({
	// 	articleBody: Yup.string().min(2, "trop court*").max(300, "Maximum 300 charactères*").required("obligatoire*"),
	// 	articlePicture: Yup.mixed()
	// 	.test("fileSize", "photo trop lourde", (value) => value === null || (value && value.size <= 2000000))
	// 	.test("fileType", "formats autorisés : jpg, jpeg, png", (value) => value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
	// 	.required("obligatoire*"),
	// })

	// use global state of authContext
	const { AuthState } = useContext(AuthContext) 


	// set state of article
	const initialArticle = {
		text: "",
		author: (AuthState.userFirstName).concat(' ',AuthState.userLastName), //a check ? AuthState.userId
		picture: "",
		youtube:"",

	}
	
	const [article, setArticle] = useState(initialArticle)

	//state of welcome message text input
	const [placeHolderText, setPlaceHolderText] = useState("Quoi de neuf ?")

	// personalize the welcome message text input with user name
	useEffect(() => {setPlaceHolderText(`Quoi de neuf ${AuthState.userFirstName} ?`)}, [AuthState])

	// state of media input choice
	const [media, setMedia] = useState("")

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState()   // supprimer selectedFile ? 

	useEffect(() => {console.log(selectedFile)}, [selectedFile])


	// submit the form and request
	function handleEditArticle(e) {


		const formData = new FormData();
		formData.append("text", article.text)
		formData.append("author", article.author)
		formData.append("youtube", article.youtube)
		if (selectedFile) {
			formData.append("picture", selectedFile) 
		}
		// selectedFile ? formData.append("picture", selectedFile) : return 0
		
		console.log(formData)

		for (var pair of formData.entries()) {
			console.log(pair[0]+ ', ' + pair[1]); 
		}

		// get user token by the local storage
		const token = JSON.parse(localStorage.getItem("token"))

		axios({
			method: "post",
			url: `${ApiUrl}/articles`,
			data: formData,
			headers: { "Content-Type": "multipart/form-data", "Authorization" : `Bearer ${token}` },
		  })
			.then((res) => {
				setArticle(initialArticle)
				console.log("Post créé")
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
				initialValues={initialArticle				}
				// validationSchema={SignupSchema}
				onSubmit={(values) => {
					handleEditArticle(values)
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
							case "upload":
								return (
									<div className="d-flex align-items-center flex-wrap">
										<span className="mb-3">Joindre une photo :</span>
										<div className="d-inline">
											<Field name="picture" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept=".jpg, .jpeg, .png" className="ytInput mb-3" />
											<ErrorMessage name="picture" component="div" className="errorInput" />
										</div>
										{/* <button type="button" onClick={() => setMedia("youtube")} className="btn-sm btn-secondary mb-3">
											Ou joindre un lien Youtube
										</button> */}
										<button type="button" onClick={() => {
											setMedia("youtube")
											setSelectedFile()
										}} className="btn-sm btn-secondary mb-3">
											Ou joindre un lien Youtube
										</button>
									</div>
								)
							case "youtube":
								return (
									<div className="d-flex align-items-center flex-wrap">
										<span className="mb-3">Lien youtube :</span>
										<div className="d-inline">
											<Field name="youtube" onChange={handleInputChange} value={article.youtube} placeholder="Votre lien Youtube" className="ytInput mb-3" />
											<ErrorMessage name="youtube" component="div" className="errorInput" />
										</div>
										{/* <button type="button" onClick={() => setMedia("upload")} className="btn-sm btn-secondary mb-3">
											Ou Joindre une image
										</button> */}
										<button type="button" onClick={() => {
											setMedia("upload")
											setArticle(() => ({
												...article,
												"youtube": "",
											}))}} className="btn-sm btn-secondary mb-3">
											Ou Joindre une image
										</button>
									</div>
								)
							default:
								return (
									<div className="d-flex flex-wrap">
										{/* <span className="w-100 mb-3">Souhaitez-vous joindre une photo ? Ou un lien youtube ?</span> */}
										<button type="button" onClick={() => setMedia("upload")} className="btn btn-secondary mb-3 ">
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
