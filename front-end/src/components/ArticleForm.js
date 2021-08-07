import React, {useEffect, useState, useContext} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import axios from "axios"
import * as Yup from "yup"
// icons
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCamera} from "@fortawesome/free-solid-svg-icons"
import {faYoutube} from "@fortawesome/free-brands-svg-icons"
// Components
import ProfilePicture from "./ProfilePicture"
import {AuthContext} from "../App"
// Utils
import {ApiUrl} from "../utils/variables-config"
import { alertErrorMessage } from "../utils/alertMessage"

export default function ArticleForm(props) {
	// use global state of authContext
	const {AuthState} = useContext(AuthContext)


	// state of media input choice
	const [media, setMedia] = useState(null)

	// personalize the welcome message text input with user name
	const [placeHolderText, setPlaceHolderText] = useState("Quoi de neuf ?")
	useEffect(() => {
		setPlaceHolderText(`Quoi de neuf ${AuthState.firstName} ?`)
	}, [AuthState])

	const [errorMessage, setErrorMessage] = useState(null) // set error message

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState()

	// submit the form and request
	function handleFormSubmit(values, resetForm) {
		// prepare data to send
		const formData = new FormData()
		formData.append("author", AuthState.user)
		if (values.text) formData.append("text", values.text)
		if (values.youtube) formData.append("youtube", values.youtube)
		// add file if exist and validated
		if (selectedFile && selectedFile.size < 2000000 && ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)) {
			formData.append("picture", selectedFile)
		} else if (selectedFile) {
			setErrorMessage("Erreur de fichier. Formats autorisés : .jpg .jpeg .png .gif, max 3Mo")
			return
		} else {}
		if (values.youtube && selectedFile) formData.delete("youtube") //security : send only one media

		for (var pair of formData.entries()) {
			// A SUPP
			console.log(pair[0] + ", " + pair[1])
		}

		axios({
			method: "post",
			url: `${ApiUrl}/articles`,
			data: formData,
			headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${AuthState.token}`},
		})
			.then((res) => {
				console.log("Post créé") //ASUPP
				resetForm()
				setErrorMessage(null)
				setSelectedFile()
				setMedia("default")
				props.setArticlesRefresh(true)
			})
			.catch((error) => {
				if (typeof error.response.data === "string") setErrorMessage(error.response.data)
				else alertErrorMessage("Erreur : impossible de poster votre post. Veuillez retenter ultérieurement")
			})
	}

	const validationSchema = Yup.object().shape({
		text: Yup.string(),
		youtube: Yup.string(),
	})

	return (
		<div className="card shadow form-2 p-3 d-flex flex-column justify-content-center">
			<h2 className="d-none">Formulaire creation post article</h2>
			<Formik
				initialValues={{text: "", youtube: ""}}
				validationSchema={validationSchema}
				onSubmit={(values, {resetForm}) => {
					if (values.text === "" && values.youtube === "" && !selectedFile) {
						setErrorMessage("Veuillez remplir au moins 1 champs du formulaire")
						return
					}
					console.log(values) //ASUPP
					handleFormSubmit(values, resetForm)
				}}
			>
				<Form>
					<div className="d-flex align-items-center justify-content-between mb-3">
						<ProfilePicture photo={AuthState.photo} class="profile-picture--mini" />
						<Field name="text" type="textarea" placeholder={placeHolderText} className="textInput px-3 py-1" style={{"height": "70px"}} />
						<ErrorMessage name="text" component="div" className="errorInput" />
					</div>

					{(() => {
						switch (media) {
							case "upload":
								return (
									<div className="d-flex justify-content-between align-items-center flex-wrap">
										{/* <span className="mb-3">Joindre une photo : &nbsp;&nbsp;&nbsp;</span> */}
										<div className="mx-auto">
											<Field name="picture" onChange={(e) => setSelectedFile(e.target.files[0])} type="file" accept=".jpg, .jpeg, .png, .gif" className="mb-3 file-input" />
										</div>
										<ErrorMessage name="picture" component="div" className="errorInput" />
										<button
											type="button"
											onClick={() => {
												setMedia("youtube")
												setSelectedFile()
											}}
											className="btn-sm btn--customize1 mb-3 d-bloc m-auto"
											title="Joindre une vidéo youtube"
											aria-label="Joindre une vidéo youtube"
										>
											Joindre une vidéo Youtube &nbsp; <FontAwesomeIcon icon={faYoutube} />
										</button>
									</div>
								)
							case "youtube":
								return (
									<div className="d-flex align-items-center flex-wrap">
										<div className="d-inline mx-auto">
											<Field name="youtube" placeholder="Votre lien Youtube" className="ytInput mb-4 px-2" />
										</div>
										<button
											type="button"
											onClick={() => setMedia("upload")}
											className="btn-sm btn--customize1 mb-4 d-bloc m-auto"
											title="Joindre une photo"
											aria-label="Joindre une photo"
										>
											Joindre une photo &nbsp;{" "}
											<span className="awesomeColorIcon">
												<FontAwesomeIcon icon={faCamera} />
											</span>
										</button>
									</div>
								)
							default:
								return (
									<div className="d-flex flex-wrap">
										<button
											type="button"
											onClick={() => setMedia("upload")}
											className="btn btn--customize1 mb-4 d-bloc m-auto"
											title="Joindre une photo"
											aria-label="Joindre une photo"
										>
											Joindre une photo &nbsp; <FontAwesomeIcon icon={faCamera} />
										</button>
										<button
											type="button"
											onClick={() => setMedia("youtube")}
											className="btn btn--customize1 mb-4 mb-lg-4 d-bloc m-auto"
											title="Joindre une video youtube"
											aria-label="Joindre une video youtube"
										>
											Joindre une vidéo Youtube &nbsp; <FontAwesomeIcon icon={faYoutube} />
										</button>
									</div>
								)
						}
					})()}

					<button type="submit" className="btn-lg btn-primary d-bloc m-auto mb-1 mt-lg-0" title="Envoyer les données" aria-label="Envoyer les données">
						Envoyer
					</button>
					{errorMessage && <div className="errorInput mt-1 text-center">{errorMessage}</div>}
				</Form>
			</Formik>
		</div>
	)
}
