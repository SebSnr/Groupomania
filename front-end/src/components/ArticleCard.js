import React, {useContext} from "react"
import ReactPlayer from "react-player"
import axios from "axios"
import {Link} from "react-router-dom"
// Utils
import {ApiUrl} from "../utils/variables-config"
// components
import ProfilePicture from "./ProfilePicture"
import {AuthContext} from "../App"

export default function ArticleCard(props) {
	// Format article date
	let options = {year: "numeric", month: "long", day: "numeric"}
	let dbDate = new Date(props.article.createdAt)
	let articleDate = dbDate.toLocaleDateString("fr-FR", options) + " , " + ("0" + dbDate.getHours()).slice(-2) + "h" + ("0" + dbDate.getMinutes()).slice(-2)

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
					alert("Post supprimé")
					props.setArticlesRefresh(true)
				}
			})
			.catch(() => alert("Impossible de supprimer ce post."))
	}


	// set article for state of article page
	let article = props.article

	// set text size css in function of media because text-overflow: ellipsis not working vertically
	let cardBodyClass= "" ;	let cardTextClass= ""; let mediaContainerClass= ""; let cardMediaNone= ""
	if (!article.picture && !article.youtube) {cardBodyClass= "card-body--full"; cardTextClass= "card-text--full" ; cardMediaNone= "d-none"}
	if (!article.text) {cardBodyClass = "card-body--mini"; mediaContainerClass = "media-container--full"}

	return (
		<div className={`card shadow article mb-4 p-3 ${props.class} `}>
			<div className={`card-body align-items-center ${cardBodyClass}`}>
				<div className="d-flex align-items-end flex-wrap mb-1">
					<ProfilePicture photo={props.article.User.photo} class="profile-picture--mini" />

					<span className="h5 flex-grow-1">{props.article.User.firstName}</span>

					{props.article.author === AuthState.user || AuthState.isAdmin === true ? (
						<button
							type="button"
							className="btn-sm bg-white fs-5"
							onClick={() => {
								if (window.confirm("Administrateur : Supprimer ce post définitivement ?")) deleteArticle()
							}}
							title="Administrateur: Supprimer l'article"
							aria-label="Administrateur: Supprimer l'article"
						>
							🗑️
						</button>
					) : null}
				</div>
				<div className={`d-flex justify-content-end mb-2 mx-1 text-muted fst-italic article__date`}>{articleDate}</div>

				<Link to={{pathname: `/articles`, state: {article}}} className="text-decoration-none">
					<p className={`card-text ${cardTextClass}`}>{props.article.text}</p>
				</Link>
			</div>
			<Link to={{pathname: `/articles`, state: {article}}} className={`text-decoration-none media-container ${mediaContainerClass} ${cardMediaNone}`}>
				<CardMedia props={props} />
			</Link>
		</div>
	)
}

function CardMedia(props) {
	if (props.props.article.picture) {
		return (
			<React.Fragment>
				<img src={props.props.article.picture} className="rounded-3" alt="article multimédia" />
			</React.Fragment>
		)
	} else if (props.props.article.youtube) {
		return (
			<React.Fragment>
				<ReactPlayer url={props.props.article.youtube} width="100%" className="overflow-hidden rounded-3" />
			</React.Fragment>
		)
	} else return ""
}
