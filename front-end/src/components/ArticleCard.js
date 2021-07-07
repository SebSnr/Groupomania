import React from "react"
import ProfilePicture from "./ProfilePicture"
import ReactPlayer from "react-player";


export default function ArticleCard(article) {

	let options = {year: 'numeric', month: 'long', day: 'numeric'};
	let opt_weekday = { weekday: 'long' }
	let dbDate = new Date(article.article.createdAt)
	let weekday = dbDate.toLocaleDateString("fr-FR", opt_weekday)


	
	let articleDate = "Publié le " + weekday + " " + dbDate.toLocaleDateString("fr-FR", options) + " à " + ("0" + dbDate.getHours()).slice(-2) + "h" + ("0" + dbDate.getMinutes()).slice(-2)

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
		</div>
	)
}
