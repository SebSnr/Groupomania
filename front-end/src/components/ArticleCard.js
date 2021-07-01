import React from "react"
import ProfilePicture from "./ProfilePicture"

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
				<p className="card-text">{article.article.youtubeUrl}</p>
			</div>
			<div className="">
				{/* <img src="./img/Montgolfiere.jpg" className="card-img-top " alt="article multimédia" /> */}
				<iframe
					width="100%"
					height="auto"
					src={article.article.youtubeUrl}
					srcdoc= {<iframe width="1150" height="647" src="https://www.youtube.com/embed/_y57KReXqhY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
				{/* <iframe width="1150" height="647" src="https://www.youtube.com/embed/_y57KReXqhY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/Y8Wp3dafaMQ"
					srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/Y8Wp3dafaMQ?autoplay=1><img src=https://img.youtube.com/vi/Y8Wp3dafaMQ/hqdefault.jpg alt='Video The Dark Knight Rises: What Went Wrong? – Wisecrack Edition'><span>▶</span></a>"
					frameborder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
					title="The Dark Knight Rises: What Went Wrong? – Wisecrack Edition"
				></iframe>
			</div>
		</div>
	)
}
