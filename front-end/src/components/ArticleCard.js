import React, { useContext } from "react"
import ProfilePicture from "./ProfilePicture"
import ReactPlayer from "react-player"
import axios from "axios"
import {ApiUrl} from "../variables-config"
import { AuthContext } from "../App"


export default function ArticleCard(props) {
	// Format article date
	let options = {year: "numeric", month: "long", day: "numeric"}
	let dbDate = new Date(props.article.createdAt)
	let articleDate = dbDate.toLocaleDateString("fr-FR", options) + " , " + ("0" + dbDate.getHours()).slice(-2) + "h" + ("0" + dbDate.getMinutes()).slice(-2)

	// get user token by the local storage
	const token = JSON.parse(localStorage.getItem("token"))

	// use global state of authContext
	const { AuthState } = useContext(AuthContext) 

	const deleteArticle = () => {
		console.log(`${ApiUrl}/articles/:${props.article.id}`)
		console.log(`Bearer ${JSON.parse(localStorage.getItem("token"))}`)

		axios({
			method: "delete",
			url: `${ApiUrl}/articles/${props.article.id}`,
			headers: {"Authorization": `Bearer ${token}`},
		})
			.then((res) => alert("Post supprimé"), (window.location = "/"))
			.catch((err) => {
				console.log(`Error during deleting process ${err}`)
				alert("Impossible de supprimer ce post.")
			})
	}


	// console.log(props.article.User.firstName)
// 	rajouter ligne 39, ne fonctionne pas toujours. problme de sync ? 

	return (
		<div className={props.class ? "card card-article shadow col-12 mb-3 mb-lg-5" : "card card-article shadow col-12 col-lg-5 mb-3 mb-lg-5"}>
			<div className="card-body align-items-center">
				<div className="d-flex align-items-end mb-1">
					<ProfilePicture />
					<span className="h5">{props.article.User.firstName}</span> 
				</div>
				<div className="d-flex justify-content-end align-items-center card-article--date mb-3">
					{articleDate}
					{props.article.author === AuthState.user ?
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
					: null }
				</div>
				<a href={`/articles/#${props.article.id}`}>
					<p className="card-text">{props.article.text}</p>
				</a>
			</div>
			{/* <div className="overflow-hidden media-content" > */}
			<div className={props.class ? null : "overflow-hidden media-content"}>
				<a href={`/articles/#${props.article.id}`}>
					{props.article.picture ? (
						<img src={props.article.picture} className="card-img-top" alt="article multimédia" />
					) : (
						<ReactPlayer url={props.article.youtube} width="100%" className="card-img-top" />
					)}
				</a>
			</div>
		</div>
	)
}