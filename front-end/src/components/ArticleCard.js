import React from "react"
import ProfilePicture from "./ProfilePicture"
import ReactPlayer from "react-player";


export default function ArticleCard(article) {
	return (
		<div className="card card-article shadow col-12 col-lg-5 mb-3 mb-lg-5">
			<div className="card-body align-items-center">
				<div className="d-flex align-items-end mb-1">
					<ProfilePicture />
					<span className="h5">{article.article.author}</span>
				</div>
				<div className="row justify-content-end card-article--date">{article.article.createdAt}</div>
				<p className="card-text">{article.article.text}</p>
			</div>
			<div className="overflow-hidden">
				{/* <img src="./img/Montgolfiere.jpg" className="card-img-top " alt="article multimédia" /> */}
				<ReactPlayer url={article.article.youtubeUrl} width="100%" />
				
			</div>
		</div>
	)
}
