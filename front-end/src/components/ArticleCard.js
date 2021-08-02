import React, {useContext} from "react"
import ReactPlayer from "react-player/youtube"
import axios from "axios"
import {Link} from "react-router-dom"
// Utils
import {ApiUrl} from "../utils/variables-config"
// components
import {AuthContext} from "../App"
import ProfilePicture from "./ProfilePicture"
import Comments from "./Comments"

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
	let cardBodyClass = ""
	let cardTextClass = ""
	let mediaContainerClass = ""
	let cardMediaNone = ""
	if (!article.picture && !article.youtube) {
		cardBodyClass = "card-body--full"
		cardTextClass = "card-text--full"
		cardMediaNone = "d-none"
	}
	if (!article.text) {
		cardBodyClass = "card-body--mini"
		mediaContainerClass = "media-container--full"
	}

	return (
		<div className={`card shadow article mb-4 ${props.class} `}>
			<div className={`border-bottom border-secondary ${props.class}__post`}>
				<div className={`card-body mb-3 align-items-center ${cardBodyClass}`}>
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

				{article.youtube || article.picture ? (
					<div className={`media-container ${mediaContainerClass} ${cardMediaNone}`}>
					<Link to={{pathname: `/articles`, state: {article}}} className={`text-decoration-none d-block`}>
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
				<Comments />
				<div className="card p-3">
					<ProfilePicture photo={props.article.User.photo} class="profile-picture--mini" />
					<span className="h5 flex-grow-1">{props.article.User.firstName}</span>
					<div className={`d-flex justify-content-end mb-2 mx-1 text-muted fst-italic article__date`}>{articleDate}</div>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi cupiditate nesciunt eaque adipisci expedita dolor recusandae, repellat sequi iste unde inventore accusamus eius
					quasi provident laboriosam, tempora eligendi amet odit corrupti quaerat vero, non sed nisi. Dolore officiis nostrum, maxime obcaecati, facere distinctio dignissimos reprehenderit
					mollitia aperiam veniam nobis ea, rerum sit deleniti voluptas perspiciatis quia aut deserunt dicta voluptates eum recusandae natus delectus! Atque, inventore tempora nihil
					exercitationem voluptatum numquam officiis quasi. Officiis labore, natus odit aliquid repellendus dignissimos non sed. Vitae, necessitatibus consectetur aperiam dignissimos
					doloribus, accusantium alias atque pariatur autem debitis molestiae maxime neque veniam praesentium temporibus consequatur! Animi dolore voluptas provident omnis nobis, incidunt
					eaque doloribus ut voluptate optio debitis, totam beatae corporis, id illum aut non esse aspernatur consectetur saepe nam velit vitae. Sint excepturi nisi dolores vero unde eum
					soluta molestiae aliquid. Odio amet deserunt inventore distinctio minima corrupti, dolore obcaecati quo veniam incidunt aut tempora asperiores laudantium ipsa vitae commodi
					adipisci labore. Tempora earum veniam corporis in accusamus, quod fugiat eum recusandae iusto aspernatur sapiente aut saepe itaque mollitia laboriosam. Tempore error commodi
					praesentium obcaecati iure reprehenderit sunt? Sed laudantium fugiat neque molestias a in totam recusandae! Numquam porro, eveniet, maiores asperiores nemo consequatur consectetur
					quae cupiditate atque qui, sed quibusdam. Velit amet eum inventore adipisci, dolores laudantium suscipit necessitatibus possimus nobis, fugiat odit laborum consectetur nisi.
					Dolores enim a, magnam facilis ut deserunt voluptates adipisci debitis natus possimus labore accusamus ipsa et praesentium dolorum. Eveniet voluptatem, delectus praesentium
					cupiditate rem, doloremque nam minus veniam repudiandae sequi necessitatibus.
				</div>
			</div>
		</div>
	)
}
