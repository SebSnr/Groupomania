import React, {useContext} from "react"
import MiniProfilePicture from "./MiniProfilePicture"
import ReactPlayer from "react-player"
import axios from "axios"
import {ApiUrl} from "../utils/variables-config"
import {AuthContext} from "../App"

export default function ArticleCard(props) {
	// Format article date
	let options = {year: "numeric", month: "long", day: "numeric"}
	let dbDate = new Date(props.article.createdAt)
	let articleDate = dbDate.toLocaleDateString("fr-FR", options) + " , " + ("0" + dbDate.getHours()).slice(-2) + "h" + ("0" + dbDate.getMinutes()).slice(-2)

	// get user token by the local storage
	const token = JSON.parse(localStorage.getItem("token"))

	// use global state of authContext
	const {AuthState} = useContext(AuthContext)

	const deleteArticle = () => {
		console.log(`${ApiUrl}/articles/:${props.article.id}`)
		console.log(`Bearer ${JSON.parse(localStorage.getItem("token"))}`)

		axios({
			method: "delete",
			url: `${ApiUrl}/articles/${props.article.id}`,
			headers: {"Authorization": `Bearer ${token}`},
		})
			.then((res) => {
				if (res.status === 200) {
					alert("Post supprimé")
					props.setArticlesRefresh(true)
					// ((window.location = "/"))
				}
			})
			.catch(() => alert("Impossible de supprimer ce post."))
	}

	// console.log(props.article.User.firstName)
	// 	rajouter "props.article.User.firstName et photo" ligne 47 sous ProfilePicture, ne fonctionne pas toujours. probleme de sync ?

	return (
		<div className="card shadow card-article col-lg-11 mb-4 p-3">
			<div className="card-body align-items-center">
				<div className="d-flex align-items-end mb-1">
					{/* <MiniProfilePicture photo={props.article.User.photo} classNameDiv={"profile-picture--mini"} classNameImg={"profile-picture__clipped--mini"} /> */}
					<MiniProfilePicture photo={props.article.User.photo} />

					<span className="h5">{props.article.User.firstName}</span>
				</div>
				<div className="d-flex justify-content-end align-items-center card-article--date mb-3 overflow-hidden">
					{articleDate}
					{props.article.author === AuthState.user || AuthState.isAdmin === true ? (
						<button
							type="button"
							className="deleteBtn btn-sm"
							onClick={() => {
								if (window.confirm("Supprimer ce post ?")) deleteArticle()
							}}
							title="Supprimer article"
							aria-label="Supprimer article"
						>
							🗑️
						</button>
					) : null}
				</div>
					<a href={`/articles/#${props.article.id}`} className="overflow-hidden">
						<p className="card-text">{props.article.text}</p>
					</a>
			</div>
			<CardMedia props={props} />
		</div>
	)
}

function CardMedia(props) {
	if (props.props.article.picture) {
		return (
			<div className="card-img-bottom overflow-hidden rounded-3">
				<a href={`/articles/#${props.props.article.id}`}>
					<img src={props.props.article.picture} className="card-img-bottom" alt="article multimédia" />
				</a>
			</div>
		)
	} else if (props.props.article.youtube) {
		return (
			<div className="card-img-bottom overflow-hidden rounded-3">
				<a href={`/articles/#${props.props.article.id}`}>
					<ReactPlayer url={props.props.article.youtube} width="100%" className="card-img-bottom" />
				</a>
			</div>
		)
	} else return ""
}
