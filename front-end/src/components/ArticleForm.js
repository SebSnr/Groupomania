import React, {useEffect, useState, useContext} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import {SocialIcon} from "react-social-icons"
import axios from "axios"
import * as Yup from "yup"
// Components
import MiniProfilePicture from "./MiniProfilePicture"
import {AuthContext} from "../App"
// Utils
import {ApiUrl} from "../utils/variables-config"

export default function ArticleForm(props) {
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

	
	// personalize the welcome message text input with user name
	const [placeHolderText, setPlaceHolderText] = useState("Quoi de neuf ?")
	useEffect(() => {
		setPlaceHolderText(`Quoi de neuf ${AuthState.firstName} ?`)
	}, [AuthState, ])

	// state of media input choice
	const [media, setMedia] = useState((null))

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState()
	useEffect(() => {
		console.log(selectedFile)
	}, [selectedFile])

	// submit the form and request
	function handleEditArticle(e) {

		if(article.text==="" && article.youtube==="" && !selectedFile){
			alert("Veuillez remplir au moins un champs du post")
			return
		}

		const formData = new FormData()
		formData.append("author", article.author)
		if (article.text) formData.append("text", article.text)
		if (article.youtube) formData.append("youtube", article.youtube)
		if (selectedFile) formData.append("picture", selectedFile)

		console.log(formData) // A SUPP

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
				setMedia("default")
				props.setArticlesRefresh(true)
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

	// const FILE_SIZE = 160 * 1024;
    // const SUPPORTED_FORMATS = [
    //   "image/jpg",
    //   "image/jpeg",
    //   "image/gif",
    //   "image/png"
    // ];
    const validationSchema = Yup.object().shape({
    //   text: Yup.string().required("A text is required"),
    //   picture: Yup
    //     .mixed()
    //     .required("A file is required")
    //     .test(
    //       "fileSize",
    //       "File too large",
    //       value => value && value.size <= FILE_SIZE
    //     )
    //     .test(
    //       "fileFormat",
    //       "Unsupported Format",
    //       value => value && SUPPORTED_FORMATS.includes(value.type)
    //     )
	})

	return (
		<div className="card shadow form-2 p-3 h-100 d-flex flex-column justify-content-center">
			<h2 className="d-none">Formulaire creation post article</h2>
			<Formik
				initialValues={{
					// text: "",
					// picture: "",
					// youtube: "",
				  }}
				// validationSchema={validationSchema}
				onSubmit={(values) => {
					handleEditArticle(values)
				}}
			>
				<Form>
					<div className="d-flex align-items-center justify-content-between mb-3">
						<MiniProfilePicture photo={AuthState.photo}/>
						<Field name="text" onChange={handleInputChange} value={article.text} type="textarea" placeholder={placeHolderText} className="textInput p-3 mb-3" />
						<ErrorMessage name="text" component="div" className="errorInput" />

					</div>

					{(() => {
						switch (media) {
							case "upload":
								return (
									<div className="d-flex align-items-center flex-wrap">
										<span className="mb-3">Joindre une photo : &nbsp;&nbsp;&nbsp;</span>
										<div className="d-inline">
											<Field name="picture" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept=".jpg, .jpeg, .png, .gif" className="mb-4 file-input" />
										</div>
										<ErrorMessage name="picture" component="div" className="errorInput" />

										<button
											type="button"
											onClick={() => {
												setMedia("youtube")
												setSelectedFile()
											}}
											className="btn-sm btn-customize1 mb-4 d-bloc m-auto"
											title="Joindre une vidéo youtube"
											aria-label="Joindre une vidéo youtube"
										>
											Joindre une vidéo Youtube &nbsp;
											<SocialIcon network="youtube" bgColor="white" style={{height: "1.2rem", margin: "0", width:"1.8rem"}} />
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
											className="btn-sm btn-customize1 mb-4 d-bloc m-auto"
											title="Joindre une photo"
											aria-label="Joindre une photo"
										>
											Joindre une photo &nbsp; 📷 
										</button>
									</div>
								)
							default:
								return (
									<div className="d-flex flex-wrap">
										<button type="button" onClick={() => setMedia("upload")} className="btn btn-customize1 mb-4 d-bloc m-auto" title="Joindre une photo" aria-label="Joindre une photo">
											Joindre une photo &nbsp; 📷
										</button>
										<button
											type="button"
											onClick={() => setMedia("youtube")}
											className="btn btn-customize1 mb-4 mb-lg-4 d-bloc m-auto"
											title="Joindre une video youtube"
											aria-label="Joindre une video youtube"
										>
											Joindre une vidéo Youtube &nbsp;
											<SocialIcon network="youtube" bgColor="white" style={{height: "1.2rem", margin: "0", width:"1.8rem"}} />
										</button>
									</div>
								)
						}
					})()}

					<button type="submit" className="btn-lg btn-primary d-bloc m-auto my-3 mt-lg-0" title="Envoyer les données" aria-label="Envoyer les données">
						Envoyer
					</button>
				</Form>
			</Formik>
		</div>
	)
}
