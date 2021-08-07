import React, {useContext} from "react"
import ReactPlayer from "react-player/youtube"
import axios from "axios"
import {Link} from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import {useHistory} from "react-router"
// components
import {AuthContext} from "../App"
import ProfilePicture from "./ProfilePicture"
import CommentsPart from "./CommentsPart"
// Utils
import {ApiUrl} from "../utils/variables-config"
import {toFormatedDate} from "../utils/toformatedDate"
import { alertErrorMessage, alertSuccessMessage } from "../utils/alertMessage"
// icons
import { faTrashAlt  } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ArticleCard(props) {

	const history = useHistory() // use history hook
	
	const MySwal = withReactContent(Swal) // custom alert button

	// Format article date
	toFormatedDate(props.article.createdAt)
	let articleDate = toFormatedDate(props.article.createdAt)

	// use global state of authContext
	const {AuthState} = useContext(AuthContext)

	const deleteArticle = () => {
		console.log(`${ApiUrl}/articles/:${props.article.id}`)
		console.log(`Bearer ${AuthState.token}`)

		axios({
			method: "delete",
			url: `${ApiUrl}/articles/${props.article.id}`,
			headers: {"Authorization": `Bearer ${AuthState.token}`},
		})
			.then((res) => {
				if (res.status === 200) {
					 //refresh all articles or, in article page, go back to home page
					if (props.setArticlesRefresh) props.setArticlesRefresh(true)
					else history.push("/")
					alertSuccessMessage("Post supprimé.", 1000)
				}
			})
			.catch(() => alertErrorMessage("Erreur : impossible de supprimer ce post."))
	}

	// set article for state of article page
	let article = props.article

	// set text size css in function of media because text-overflow: ellipsis not working vertically
	let cardBodyClass = ""
	let cardTextClass = ""
	let mediaContainerClass = ""
	let cardMediaNone = ""
	if (!article.picture && !article.youtube) {
		cardBodyClass = "card-body--header--full"
		cardTextClass = "card-text--full"
		cardMediaNone = "d-none"
	}
	if (!article.text) {
		cardBodyClass = "card-body--header--mini"
		mediaContainerClass = "media-container--full"
	}

	return (
		<div className={`card shadow article w-100 mb-4 ${props.class} `}>
			<div className={`border-bottom ${props.class}__post`}>
				<div className={`card-body card-body--header mb-3 align-items-center ${cardBodyClass}`}>
					<div className="d-flex align-items-end flex-wrap mb-1">
						<ProfilePicture photo={props.article.User.photo} class="profile-picture--mini" />

						<span className="h5 flex-grow-1">
							{props.article.User.firstName} {props.article.User.lastName}
						</span>

						{props.article.UserId === AuthState.user || AuthState.isAdmin === true ? (
							<button
								type="button"
								className="btn-sm bg-white btn--trash fs-5"
								onClick={() => {
									MySwal.fire({
										title: "❌ Supprimer ce post ?",
										timer: 15000,
										showCancelButton: true,
										confirmButtonText: "Oui",
										cancelButtonText: "Non",
										buttonsStyling: false,
										customClass: {
											confirmButton: "btn btn-danger mx-3",
											cancelButton: "btn btn-primary mx-3",
											title: "h5 font",
											popup: "card",
										},
									}).then((result) => {
										if (result.isConfirmed) {
											deleteArticle()
										} else return
									})
								}}
								title="supprimer le post"
								aria-label="supprimer le post"
							>
								<FontAwesomeIcon icon={faTrashAlt} />
							</button>
						) : null}
					</div>
					<div className={`d-flex justify-content-end mb-2 mx-1 text-muted fst-italic article__date`}>{articleDate}</div>

					<Link to={{pathname: `/articles`, state: {article}}} className="text-decoration-none" title="Ouvrir le post">
						<p className={`card-text ${cardTextClass}`}>{props.article.text}</p>
					</Link>
				</div>

				{article.youtube || article.picture ? (
					<div className={`media-container ${mediaContainerClass} ${cardMediaNone}`}>
						<Link to={{pathname: `/articles`, state: {article}}} className={`text-decoration-none`} title="Ouvrir le post">
							{article.youtube ? (
								<ReactPlayer url={props.article.youtube} width="100%" className="overflow-hidden" config={{youtube: {playerVars: {origin: "https://www.youtube.com"}}}} />
							) : (
								<img src={props.article.picture} className="" alt="article multimédia" />
							)}
						</Link>
					</div>
				) : null}
			</div>
			<CommentsPart article={props.article} setArticlesRefresh={props.setArticlesRefresh} />
		</div>
	)
}
