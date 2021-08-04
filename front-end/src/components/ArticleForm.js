import React, {useEffect, useState, useContext} from "react"
import {Formik, Form, Field, ErrorMessage} from "formik"
import {SocialIcon} from "react-social-icons"
import axios from "axios"
import * as Yup from "yup"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
// Components
import ProfilePicture from "./ProfilePicture"
import {AuthContext} from "../App"
// Utils
import {ApiUrl} from "../utils/variables-config"

export default function ArticleForm(props) {
	// use global state of authContext
	const {AuthState} = useContext(AuthContext)

	const MySwal = withReactContent(Swal) // custom alert button

	// state of media input choice
	const [media, setMedia] = useState(null)

	// personalize the welcome message text input with user name
	const [placeHolderText, setPlaceHolderText] = useState("Quoi de neuf ?")
	useEffect(() => {
		setPlaceHolderText(`Quoi de neuf ${AuthState.firstName} ?`)
	}, [AuthState])

	// state of uploaded file
	const [selectedFile, setSelectedFile] = useState()

	// submit the form and request
	function handleFormSubmit(values, resetForm) {
		// unless one field required
		if (values.text === "" && values.youtube === "" && !selectedFile) {
			alert("Veuillez remplir au moins un champs du post")
			return
		}

		// prepare data to send
		const formData = new FormData()
		formData.append("author", AuthState.user)
		if (values.text) formData.append("text", values.text)
		if (values.youtube) formData.append("youtube", values.youtube)
		if (selectedFile && selectedFile.size < 2000000 && ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)) {
			formData.append("picture", selectedFile)
		}
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
				setSelectedFile()
				setMedia("default")
				props.setArticlesRefresh(true)
			})
			.catch(() => {
				MySwal.fire({
					title: "Erreur : impossible de publier ce post",
					icon: "error",
					showCloseButton: false,
					buttonsStyling: false,
					customClass: {
						confirmButton: "btn btn-primary mx-3",
						title: "h4 font",
						popup: "card",
					},
				})
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
											<SocialIcon network="youtube" bgColor="white" style={{height: "1.2rem", margin: "0", width: "1.8rem"}} />
										</button>
									</div>
								)
							case "youtube":
								return (
									<div className="d-flex align-items-center flex-wrap">
										<span className="mb-3">Lien youtube :</span>
										<div className="d-inline">
											<Field name="youtube" placeholder="Votre lien Youtube" className="ytInput mb-4" />
										</div>
										<button
											type="button"
											onClick={() => setMedia("upload")}
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
										<button
											type="button"
											onClick={() => setMedia("upload")}
											className="btn btn-customize1 mb-4 d-bloc m-auto"
											title="Joindre une photo"
											aria-label="Joindre une photo"
										>
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
											<SocialIcon network="youtube" bgColor="white" style={{height: "1.2rem", margin: "0", width: "1.8rem"}} />
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
