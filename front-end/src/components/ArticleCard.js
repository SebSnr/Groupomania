import React, {useContext} from "react"
import ReactPlayer from "react-player/youtube"
import axios from "axios"
import {Link} from "react-router-dom"
// components
import {AuthContext} from "../App"
import ProfilePicture from "./ProfilePicture"
import CommentsPart from "./CommentsPart"
// Utils
import {ApiUrl} from "../utils/variables-config"
import { toFormatedDate } from "../utils/toformatedDate"

export default function ArticleCard(props) {

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
					alert("Post supprimé")
					props.setArticlesRefresh(true)
				}
			})
			.catch(() => alert("Impossible de supprimer ce post."))
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

						<span className="h5 flex-grow-1">{props.article.User.firstName} {props.article.User.lastName}</span>

						{props.article.UserId === AuthState.user || AuthState.isAdmin === true ? (
							<button
								type="button"
								className="btn-sm bg-white fs-5"
								onClick={() => {
									if (window.confirm("Supprimer ce post définitivement ?")) deleteArticle()
								}}
								title="supprimer l'article"
								aria-label="supprimer l'article"
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

				{article.youtube || article.picture ? (
					<div className={`media-container ${mediaContainerClass} ${cardMediaNone}`}>
					<Link to={{pathname: `/articles`, state: {article}}} className={`text-decoration-none`}>
						{article.youtube ? (
							<ReactPlayer url={props.article.youtube} width="100%" className="overflow-hidden" config={{youtube: {playerVars: {origin: "https://www.youtube.com"}}}} />
						) : (
							<img src={props.article.picture} className="" alt="article multimédia" />
						)}
					</Link>
					</div>
				) : null}
			</div>

			<div className="card-body">
				<CommentsPart article={props.article} setArticlesRefresh={props.setArticlesRefresh}/>
			</div>
		</div>
	)
}
