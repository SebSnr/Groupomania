import React from "react"
import ProfilePicture from "./ProfilePicture"
import ReactPlayer from "react-player";
import axios from "axios";
import { ApiUrl } from "../variables-config";

export default function ArticleCard(article) {

	// Format article date
	let options = {year: 'numeric', month: 'long', day: 'numeric'};
	let opt_weekday = { weekday: 'long' }
	let dbDate = new Date(article.article.createdAt)
	let weekday = dbDate.toLocaleDateString("fr-FR", opt_weekday)
	let articleDate = "Publié le " + weekday + " " + dbDate.toLocaleDateString("fr-FR", options) + " à " + ("0" + dbDate.getHours()).slice(-2) + "h" + ("0" + dbDate.getMinutes()).slice(-2)

	// get user token by the local storage
    const token = JSON.parse(localStorage.getItem("token"))

	const deleteArticle = () => {

		console.log(`${ApiUrl}/articles/:${article.article.id}`)
		console.log(`Bearer ${JSON.parse(localStorage.getItem("token"))}`)

		axios({
			method: "delete",
			url: `${ApiUrl}/articles/${article.article.id}`,
			headers: {"Authorization" : `Bearer ${token}` },
		})
			.then((res) => 
				alert("Post supprimé")
			)
			.catch((err) => {
				console.log(`Error during deleting process ${err}`)
				alert("Impossible de supprimer ce post.")
			})
		
}

let articleLink = `http://localhost:3000/post/%${article.article.id}`

	return (
		<div className="card card-article shadow col-12 col-lg-5 mb-3 mb-lg-5">
			<div className="card-body align-items-center">
				<div className="d-flex align-items-end mb-1">
					<ProfilePicture />
					<span className="h5">{article.article.author}</span>
				</div>
				<div className="row justify-content-end card-article--date">{articleDate}</div>
				<p className="card-text">{article.article.text}</p>
			</div>
			<div className="overflow-hidden media-content" >
				{article.article.picture ? <img src={article.article.picture} className="card-img-top" alt="article multimédia" />
				: <ReactPlayer url={article.article.youtube} width="100%" className="card-img-top"/> }
			</div>
			<div>
				<button type="button" className="deleteBtn" onClick={() => { if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) deleteArticle() } } className="btn-sm ml-5">🗑️</button>
			</div>
			<a href={articleLink} class="stretched-link"></a>
		</div>
	)
}
