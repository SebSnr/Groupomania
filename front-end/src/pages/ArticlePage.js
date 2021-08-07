import React from "react"
import Loader from "react-loader-spinner"
// components
import Navigation from "../components/Navigation"
import ArticleCard from "../components/ArticleCard"

export default function ArticlePage(props) {
	let article = props.location.state.article  // get article data from props

	// loader page if no article data
if (!article) return <div className="d-flex justify-content-center align-items-center vh-100 bg-white"><Loader type="TailSpin" color="#036bfc" height={100} width={100} timeout={300000} /></div>
	else
		return (
			<React.Fragment>
				<Navigation />
				<main className="container gx-0 d-flex justify-content-center ">
					<ArticleCard article={article}  class="article--page" />
				</main>
			</React.Fragment>
		)
}
